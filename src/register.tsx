import { useRef,useReducer } from 'react'
import { NavLink } from 'react-router-dom';

type FormState = {
  data: {
    [key: string]: {
      value: string | [] | number;
      isValid: boolean | null;
      validationMessage: string;
      required: boolean;
      ref: any;
    };
  };
  isValid: boolean;
};

const ACTIONS = {
  clear:"clear",
  submit:"form_submit",
  required:"required_input",
  focused: "input_focused",
  email: "EMAIL_VALIDATIION",
  name:"NAME_EXISTS",
  phone: "PHONE_FORMAT",
  password:"STRONG_PASSWORD"
}
const ERRORS = {
  emailValidation: 'Invalid email format, your email should include an "@"',
  passwordValidation: 'Weak password, your password should have 8 digits or more',
  phoneValidation: 'Invalid phone number, your phone number should contain 8 digits',
  privacyandterms: 'You must agree to the privacy and terms',
  isRequired: 'This field is required'
};

function formReducer(formState: FormState, action: any): FormState {
  let updatedData = { ...formState.data };
  let updatedFormValidity = true;

  switch (action.type) {
    case ACTIONS.submit:
      for (const field in updatedData) {
        if (!updatedData[field].isValid === false) {
          if (updatedData[field].ref && updatedData[field].ref.current) {
            updatedData[field].ref.current.focus();
          }
          break;
        }
      }
      break;

    case ACTIONS.required:
    case ACTIONS.focused:
      if (updatedData[action.field]?.required) {
        updatedData[action.field] = {
          ...updatedData[action.field],
          value: action.value,
          isValid: action.value.length > 0,
          validationMessage: ERRORS.isRequired,
        };

        switch (action.field) {
          case 'phone':
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.length === 8,
                validationMessage: ERRORS.phoneValidation,
              };
            }
            break;

          case 'email':
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.includes("@"),
                validationMessage: ERRORS.emailValidation,
              };
            }
            break;      
          
          case 'password':
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.length >= 8,
                validationMessage: ERRORS.passwordValidation,
              };
            }
            break;
        }
      }
      break;

    default:
      // Handle other action types if needed
      break;
  }

  // Check if all fields are valid
  for (const field in updatedData) {
    if (!updatedData[field].isValid) {
      updatedFormValidity = false;
      break;
    }
  }

  return {
    data: updatedData,
    isValid: updatedFormValidity,
  };
}

function Register() {

  const initialData : FormState = {
    data: {
      name: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },
      email: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },
      phone: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },
      password: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      }        
    },
    isValid: false,
  };
  const [formState, dispatch] = useReducer(formReducer, initialData);
  console.log(formState)

  const handleInputChange = (e: any) => {
    const regex = /^[a-zA-Z]+$/;
    if(e.target.id==="phone"){
    if (regex.test(e.target.value)) {
      return false;
    }
    }
    dispatch({
      type: ACTIONS.required,
      value: e.target.value,
      field: e.target.id
    });
  };

  const handleInputFocus = (e:any) => {
    dispatch({
      type: ACTIONS.focused,
      value: e.target.value,
      field: e.target.id
    });
  };
  const handleRegister = async (e:any) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.submit
    });
  
    if (formState.isValid === false) {
      const formData = {} as any;
      for (const key in  Object.keys(formState.data)) {
        formData[key] = formState.data[key].value;
      }
  
      console.log(formData);
      const axios = (await import("axios")).default;
      await axios.post('http://localhost:3000/api/auth/register', formData)
        .then(function (response) {
          console.log('success', response);
        }).catch((error) => {
          console.log(error);
        });
      }
  };

  return (
  <form className="md:w-1/3 w-full p-4 bg-white shadow-md mx-auto" onSubmit={(e)=>handleRegister(e)}>    
      <h2 className="text-xl font-bold mb-2">Register</h2>
      <label htmlFor="Name">Name:</label>
      <input 
        id="name"
        name="name"
        type="text"
        ref={formState.data.name.ref}
        value={formState.data.name.value}
        onChange={(e)=>handleInputChange(e)}
        onFocus={(e)=>handleInputFocus(e)}
        placeholder="Name"
        required={formState.data.name.required}
        className="w-full h-14 px-4 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
        />
      {formState.data.name.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.name.validationMessage}</p>}
      <label htmlFor="Email">Email:</label>
      <input 
          id="email"
          type="text"          
          name="email"
          ref={formState.data.email.ref}
          value={formState.data.email.value}
          onChange={(e)=>handleInputChange(e)}
          onFocus={(e)=>handleInputFocus(e)}
          placeholder="Email"
          required={formState.data.email.required}
          className="w-full h-14 px-4 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
      />
      {formState.data.email.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.email.validationMessage}</p>}
      <label htmlFor="password">Password:</label>
      <input 
        id="password"
        name="password"
        type="password"
        ref={formState.data.password.ref}
        value={formState.data.password.value}
        onChange={(e)=>handleInputChange(e)}
        onFocus={(e)=>handleInputFocus(e)}
        placeholder="Name"
        required={formState.data.password.required}
        className="w-full h-14 px-4 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
      />
      {formState.data.password.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.password.validationMessage}</p>}
      <label htmlFor="Phone">Phone:</label>
      <input 
          id="phone"
          type="text"          
          name="phone"
          maxLength={8}
          ref={formState.data.phone.ref}
          value={formState.data.phone.value}
          onChange={(e)=>handleInputChange(e)}
          onFocus={(e)=>handleInputFocus(e)}
          placeholder="## ### ###"
          required={formState.data.phone.required}
          className="w-full h-14 px-4 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
      />  
      {formState.data.phone.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.phone.validationMessage}</p>}
      <p className='mt-5 mb-2'>Your personal data will be used to support your experience throughout this website, to manage access to your account.</p>
      <NavLink to="/" className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Sign Up</NavLink>
  </form>
  );
}
export default Register;
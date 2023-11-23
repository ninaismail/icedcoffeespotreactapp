import { useRef,useReducer } from 'react'
import { NavLink } from 'react-router-dom';
import { useLogin } from "./hooks/useLogin"
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
  submit:"form_submit",
  required:"required_input",
  focused: "input_focused",
  email: "EMAIL_VALIDATIION",
  password:"STRONG_PASSWORD"
}
const ERRORS = {
  emailValidation: 'Invalid email format, your email should include an "@"',
  passwordValidation: 'Weak password, your password should have 8 digits or more',
  isRequired: 'This field is required'
};

function formReducer(formState: FormState, action: any): FormState {
  let updatedData = { ...formState.data };
  let updatedFormValidity = true;

  switch (action.type) {
    case ACTIONS.submit:
      for (const field in updatedData) {
        if (!updatedData[field].isValid) {
          if (updatedData[field].ref && updatedData[field].ref.current) {
            updatedData[field].ref.current.focus();
          }
          updatedFormValidity = false; // Set to false if any field is not valid
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
          case 'password':
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.length >= 8,
                validationMessage: ERRORS.passwordValidation,
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

export default function Login() {
  const { signin } = useLogin();

  const initialData: FormState = {
  data: {
    email: {
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

  const handleLogin = async (e:any)=>{
    e.preventDefault();
    console.log("i'm here")
    dispatch({
      type: ACTIONS.submit
    });

    if (formState.isValid === false) {
      //do something
    }
      const formData: any = {};
      for (const key in formState.data) {
        formData[key] = formState.data[key].value;
      }
  
      console.log("data to submit",formData);
      const axios = (await import("axios")).default;
      await axios.post('http://localhost:3000/api/auth/login', formData)
        .then(function (response) {
          console.log('success', response);
          // update the auth context
          signin(response.data._id,response.data.accessToken,response.data.name)
        }).catch((error) => {
          console.log('error', error);
      });
  }

  return (
    <form className="lg:w-1/3 md:w-1/2 w-full p-4 bg-white shadow-md mx-auto" onSubmit={(e)=>handleLogin(e)}>
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <label htmlFor="email">Email:</label>
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
      <div className="flex justify-between items-center gap-2 mt-5">
        <button className="w-1/3 bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Sign In</button>
        <p>Don't have an account yet? <NavLink to="/register" className="text-[#E97451] hover:brightness-125 text-sm font-bold py-2 px-4 rounded">Register</NavLink></p>
      </div>
    </form>
  )
}
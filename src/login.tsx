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

  const handleInputChange = (e:any) => {
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
          signin(response.data)
        }).catch((error) => {
          console.log('error', error);
      });
  }
  // const GoogleSignIn = async (e:any) => {
  //   e.preventDefault();
  //   window.location.pathname = 'http://localhost:3000/auth/google'
  //   //signin(response.data)
  // }
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
      <div className="flex justify-between items-center gap-2 my-5">
        <button className="w-1/3 bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Sign In</button>
        <p>Don't have an account yet? <NavLink to="/register" className="text-[#E97451] hover:brightness-125 text-sm font-bold py-2 px-4 rounded">Register</NavLink></p>
      </div>
      <p className='text-center'>------- Or Use -------</p>
      <NavLink to='http://localhost:3000/auth/google' className="flex items-center mx-auto my-2 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
      <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" version="1.1">
          <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                      <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1" fill="#FBBC05"> </path>
                      <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2" fill="#EB4335"> </path>
                      <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3" fill="#34A853"> </path>
                      <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4" fill="#4285F4"> </path>
                  </g>
              </g>
          </g>
      </svg>
      <span>Continue with Google</span>
      </NavLink>
    </form>
  )
}
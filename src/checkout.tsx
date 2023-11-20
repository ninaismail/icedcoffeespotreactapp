import { useCart } from "react-use-cart"
import { useRef,useReducer } from 'react'
import { NavLink } from "react-router-dom";

type FormState = {
  data: {
    [key: string]: {
      value: string | [];
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
  phone:"PHONE_FORMAT",
  password:"STRONG_PASSWORD"
}
const ERRORS = {
  emailValidation: 'Invalid email format, your email should include an "@"',
  phoneValidation: 'Invalid phone number, your phone number should contain 8 digits',
  // nameExists: 'Name already exists',
  // phoneExists: 'Phone already exists',
  // emailExists: 'Email already exists',
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
        }
      }
      break;

    default:
      // Handle other action types if needed
      break;
  }

  for (const field in updatedData) {
    if (!updatedData[field].isValid === false) {
      updatedFormValidity = false;
      break;
    }
  }

  return {
    data: updatedData,
    isValid: updatedFormValidity,
  };
}

function CheckoutPage() {
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
      address: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      }, 
      type_of_destination: {
        value: "",
        isValid: true,
        validationMessage: "",
        required: false,
        ref: useRef()
      },  
      note: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: false,
        ref: useRef()
      },
      user_id: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },
      icedcoffees: {
        value: [],
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },
      total_amount: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef()
      },        
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
  const handleSubmit = async (e:any) => {
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
      await axios.post('http://localhost:3000/api/order', formData)
        .then(function (response) {
          console.log('success', response);
        }).catch((error) => {
          console.log(error);
        });
      }
  };

  const clearInputs = (e:any) => {
    //
  }
    return (
      <form className="md:w-1/3 w-full mx-auto p-4" onSubmit={(e)=>handleSubmit(e)}>
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
        className="w-full h-14 px-4 my-2 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
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
          className="w-full h-14 px-4 mt-2 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
        />
      {formState.data.email.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.email.validationMessage}</p>}
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
          className="w-full h-14 px-4 mt-2 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
      />  
      {formState.data.phone.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.phone.validationMessage}</p>}
      <label htmlFor="Address">Address:</label>
      <textarea
          id="address"
          name="address"
          rows={6}
          ref={formState.data.address.ref}
          value={formState.data.address.value}
          onChange={(e)=>handleInputChange(e)}
          onFocus={(e)=>handleInputFocus(e)}
          placeholder="Write your detailed addrerss: city, street, known places closest to you, building name, floor,..."
          required={formState.data.address.required}
          className="w-full px-4 my-2 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
        />
      {formState.data.address.isValid === false && <p className="mb-2 text-[12px] text-red-500">{formState.data.address.validationMessage}</p>}
      <div className="flex gap-2 items-center">
      <label htmlFor="Destination Type">Destination Type:</label>
        <input
          type="radio"
          name="type_of_destination"
          id="type_of_destination"
          ref={formState.data.type_of_destination.ref}
          value={formState.data.type_of_destination.value}
          onChange={(e)=>handleInputChange(e)}
          onFocus={(e)=>handleInputFocus(e)}
          required={formState.data.type_of_destination.required}
          className="cursor-pointer w-[15px] h-[15px]"
      />
      </div>
      <label htmlFor="Note">Note:</label>
      <textarea
          id="note"
          name="note"
          rows={3}
          ref={formState.data.note.ref}
          value={formState.data.note.value}
          onChange={(e)=>handleInputChange(e)}
          onFocus={(e)=>handleInputFocus(e)}
          required={formState.data.note.required}
          placeholder="Anything else you want to add?"
          className="w-full px-4 my-2 placeholder:text-gray-400 placeholder:text-sm text-gray-600 border-2 border-gray-200 hover:border-[#E97451] outline-none rounded-lg"
      /> 
      <div className="flex justify-end items-center gap-2">
        <NavLink to="/" className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Place Order</NavLink>
        <button className="bg-white hover:brightness-125 text-[#E97451] border border-[#E97451] text-sm font-bold py-2 px-4 rounded" onClick={(e)=>clearInputs(e)}>Cancel</button>
      </div>       
  </form> 
    );
}
export default CheckoutPage;
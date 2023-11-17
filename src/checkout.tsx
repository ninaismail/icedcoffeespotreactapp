import { useCart } from "react-use-cart"
import { useRef,useReducer } from 'react'

type FormState = {
  data: {
    [key: string]: {
      value: string;
      isValid: boolean | null;
      validationMessage: string;
      required: boolean;
      ref: React.RefObject<HTMLInputElement | null>;
    };
  };
  isValid: boolean;
};
type FormAction = { type: string, field: string, value: string, payload?: number; };

const ERRORS = {
    emailValidation : "Please include an '@' in the email address" ,
    phoneValidation : "The phone format is invalid. Right Format: '961' followed by 6 digits.",
    isRequired: "This field is required",
    nameExists: "This name already exists.",
    phoneExists : "Tthis phone number already exists.",
    emailExists: "This email already exists.",
    passwordValidation: "Your password should have at least 8 characters.",
    privacyandterms: "You need to accept the terms of service and privacy policy before you proceed."
}
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

function formReducer(formState: FormState, action: FormAction): FormState {
  let updatedData = { ...formState.data };
  let updatedFormValidity = true;

  switch (action.type) {
    case ACTIONS.submit:
      for (const field in updatedData) {
        if (!updatedData[field].isValid) {
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
          case "phone":
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: /^961/.test(action.value) && action.value.length === 9,
                validationMessage: ERRORS.phoneValidation || "",
              };
            }
            break;

          case ACTIONS.email:
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.includes("@"),
                validationMessage: ERRORS.emailValidation || "",
              };
            }
            break;

          case ACTIONS.password:
            if (action.value.length > 0) {
              updatedData[action.field] = {
                ...updatedData[action.field],
                isValid: action.value.length >= 8,
                validationMessage: ERRORS.passwordValidation || "",
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

function CheckoutPage() {
  const initialData : FormState = {
    data: {
        name: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef(),
        },
        email: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef(),
        },
        phone: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef(),
        },
        address: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef(),
        }, 
        type_of_destination: {
        value: "",
        isValid: true,
        validationMessage: "",
        required: false,
        ref: useRef(),
        },  
        note: {
        value: "",
        isValid: null,
        validationMessage: "",
        required: true,
        ref: useRef(),
        },
    },
    isValid: false,
  };
  const [formState, dispatch] = useReducer(formReducer, initialData);
  console.log(formState)

    return (
        <></>
    );
}
export default CheckoutPage;
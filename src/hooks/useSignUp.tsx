import { useAuthContext } from './useAuthContext'
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
export const useSignup = () => {
  const {dispatch}  = useAuthContext()

  const signup = (data: FormState) => {
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({ type: 'LOGIN', payload: data })
    window.location.pathname = '/profile'
  }

  return { signup }
}

import { createContext, useReducer, useEffect, ReactNode } from 'react'
type FormState = {
  user: string
};
type AuthWrapperProps = {
  children: ReactNode;
}
export const AuthContext = createContext({} as any)

export const authReducer = (state: FormState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthWrapperProps) => {
  const userString = localStorage.getItem('user');
  const user = userString!== null && JSON.parse(userString);
  
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

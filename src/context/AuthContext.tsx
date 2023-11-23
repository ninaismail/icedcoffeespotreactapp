import { createContext, useReducer, useEffect, ReactNode } from 'react'
import Cookie from 'cookie-universal';

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
  const userId = JSON.stringify(localStorage.getItem('user'))
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    if (userId !== null) {
      dispatch({ type: 'LOGIN', payload: userId })
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const {dispatch}  = useAuthContext()

  const signup = (id:string) => {
    localStorage.setItem('user', JSON.stringify(id))
    dispatch({ type: 'LOGIN', payload: id })
    window.location.pathname = '/profile'
  }

  return { signup }
}

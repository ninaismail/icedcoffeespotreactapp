import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const {dispatch}  = useAuthContext()

  const signup = (id: string, token: string, name: String) => {
    localStorage.setItem('user', token)
    localStorage.setItem('user_name', JSON.stringify(name))
    localStorage.setItem('user_id', JSON.stringify(id))
    dispatch({ type: 'LOGIN', payload: token })
    window.location.pathname = '/profile'
  }

  return { signup }
}

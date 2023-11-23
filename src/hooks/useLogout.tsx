import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
      dispatch({ type: 'LOGOUT' })
      window.location.pathname = '/register'
  }

  return { logout }
}
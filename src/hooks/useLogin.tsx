import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const {dispatch}  = useAuthContext()

    const signin = (id: string, token: string, name: string) => {
      localStorage.setItem('user', token)
      localStorage.setItem('user_name', JSON.stringify(name))
      localStorage.setItem('user_id', JSON.stringify(id))
      dispatch({ type: 'LOGIN', payload: token })
    window.location.pathname = '/'
  }

  return { signin }
}

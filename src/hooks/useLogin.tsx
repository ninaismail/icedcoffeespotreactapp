import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const {dispatch}  = useAuthContext()

    const signin = (id: string) => {
    localStorage.setItem('user', JSON.stringify(id))
    dispatch({ type: 'LOGIN', payload: id })
    window.location.pathname = '/'
  }

  return { signin }
}

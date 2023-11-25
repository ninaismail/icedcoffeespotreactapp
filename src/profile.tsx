import { useEffect } from "react";
import { useLogin } from './hooks/useLogin'

export default function Profile() {
  const { signin } = useLogin()
  useEffect(() => {
    const getUser = async () => {
      const axios = (await import("axios")).default;
      await axios.get('http://localhost:3000/auth/login/success', { withCredentials: true })
        .then(function (response) {
          console.log('success google user', response);
          // update the auth context
          //setUser(response.data)
          signin(response.data)
        }).catch((error) => {
          console.log('error google user', error);
      });
    };
    getUser();
  }, []);
  return (
    <div className="lg:w-1/3 md:w-1/2 w-full h-full p-4 bg-white shadow-md m-auto">
    <h2 className="text-xl font-bold text-center">Hello</h2></div>
  )
}
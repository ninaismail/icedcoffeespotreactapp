import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

const LoginButton = () => {
    const { user } = useAuthContext()

    return (
        <>{(!user || user===null) && (<NavLink to='login' className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">
            Sign In
        </NavLink>)}</>
    )
}

export default LoginButton;
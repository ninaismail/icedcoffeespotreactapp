import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'

const LogoutButton = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext()

    return (
        <>{(user!==null) && (<button onClick={logout} className="text-[#E97451] hover:brightness-125 bg-white text-sm font-bold py-2 px-4 rounded">
            Log Out
        </button>)}</>
    )
}

export default LogoutButton

const LogoutButton = () => {
    const  isAuthenticated = false;
    const logout = () => {
    //
    }
    return (
        isAuthenticated && (
            <button onClick={() => logout()} className="text-[#E97451] hover:brightness-125 bg-white text-sm font-bold py-2 px-4 rounded">
                Sign Out
            </button>
        )
    )
}

export default LogoutButton
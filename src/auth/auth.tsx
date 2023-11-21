import { createContext, useState, ReactNode } from "react";
type AuthWrapperProps = {
    children: ReactNode;
  }
const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthWrapperProps) => {

    const [user, setUser] = useState({email: "", isAuthenticated: false})

    const login = (inputedEmail:string, inputedPassword:string) => {
        //
    }
    const logout = () => {
        setUser({...user, isAuthenticated: false})
    }


    return (
        <AuthContext.Provider value={{user, login, logout}}>
        {children}    
        </AuthContext.Provider>
    )
}

export default AuthContext;
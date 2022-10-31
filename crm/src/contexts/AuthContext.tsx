import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthData } from "../common/interfaces/AuthData";

interface AuthContextValue {
    isAuth: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(true);
    const navigate = useNavigate();

    const login = (authData: AuthData) => {
        console.log(authData);
        setIsAuth(true);
        navigate('/');
    };

    const logout = () => {
        setIsAuth(false);
        navigate('/login');
    }

    const context = { isAuth, login, logout };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AppApi, OrdersApi } from "../api";
import { AuthDataDto } from "../common/dto/AuthData";
import PubSub from "../services/PubSub";
import TokenService from "../services/TokenService";

interface AuthContextValue {
    isAuth: boolean;
    login: (authData: AuthDataDto) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(TokenService.isTokenValid());
    const navigate = useNavigate();

    const login = async (authData: AuthDataDto) => {
        try {
            const response = await AppApi.login(authData);
    
            TokenService.setToken(response.access_token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        TokenService.removeToken();
        setIsAuth(false);
        navigate('/login');
    }

    PubSub.on('logout', logout);

    const context = { isAuth, login, logout };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
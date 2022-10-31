import { AuthForm } from "./components/AuthForm";
import { useAuth } from "../../contexts/AuthContext";

export function LoginPage() {
    const { login } = useAuth();

    return (
        <>
            <h1>Вход</h1>
            <AuthForm onLogin={login} />
        </>
    )
}
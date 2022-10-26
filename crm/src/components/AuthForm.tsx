import { FormEventHandler, useState, useRef, useEffect } from "react";
import { AuthData } from "../common/interfaces/AuthData";

interface AuthFormProps {
    onLogin: (authData: AuthData) => void;
}

export function AuthForm(props: AuthFormProps) {
    const form = useRef<any>();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEventHandler<HTMLFormElement> | any): void => {
        event.preventDefault();
        props.onLogin({ userName, password });
        
        reset();
    };

    const reset = () => {
        setUserName('');
        setPassword('');
    };

    return (
        <>
            <form ref={form} onSubmit={handleSubmit}>
                <label>
                    <div>User name</div>
                    <input id="name" type="text" required value={userName} onChange={event => setUserName(event.target.value)} />
                </label>

                <label>
                    <div>Password</div>
                    <input id="name" type="password" required value={password} onChange={event => setPassword(event.target.value)} />
                </label>

                <button type="submit">Login</button>
            </form>
        </>
    )
}
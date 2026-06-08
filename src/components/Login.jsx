import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService.js";

function Login()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password)
        {
            setError("Wprowadz login i hasło!");
            return;
        }

        fetch(`https://my-json-server.typicode.com/bsrwx/hotel-reservations-project/users?username=${username}&password=${password}`)
            .then(res => res.json())
            .then(users => {
                if (users.length === 0)
                {
                    setError("Błędny login lub hasło!");
                    return;
                }

                authService.login(users[0]);
                navigate("/dashboard");
            })
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Logowanie</h3>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hasło</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Zaloguj się</button>
                    <div className="text-center">
                        <span className="text-muted">Nie masz konta? </span>
                        <Link to="/register">Zarejestruj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );  
}

export default Login;

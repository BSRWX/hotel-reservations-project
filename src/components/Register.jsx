import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password || !confirmPassword)
        {
            setError("Wszystkie pola są wymagane");
            return;
        }

        if (password !== confirmPassword)
        {
            setError("Hasła nie są identyczne");
            return;
        }

        fetch(`http://localhost:3001/users?username=${username}`)
            .then(res => res.json())
            .then(existingUsers => {
                if (existingUsers.length > 0)
                {
                    setError("Użytkownik o tej nazwie już istnieje!");
                    return;
                }

                const newUser = { username, password, role: 'client'};

                fetch('http://localhost:3001/users',
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify(newUser)
                }).then(() => {
                    setSuccess("Rejestracja powiodła się! Za chwilę nastąpi przekierowanie...");
                    setTimeout(() => navigate('/login'), 2000);
                })
            })
    }

    return (
        <div className="container mt-5" style= {{maxWidth: "400px"}}>
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Rejestracja</h3>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Hasło</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Powtórz Hasło</label>
                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Zarejestruj Się</button>
                </form>
            </div>
        </div>
    );  
}

export default Register;

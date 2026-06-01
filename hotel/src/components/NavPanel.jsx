import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function NavPanel() 
{
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = authService.currentUser.subscribe(loggedUser => {
        setUser(loggedUser);
    });

    return () => subscription.unsubscribe;
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  }

  return (
    <header style={{ background: '#2c3e50', padding: '15px 20px' }}>
      <nav className="container d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="text-white text-decoration-none fw-bold me-3">Hotel</Link>
          <Link to="/rooms" className="text-white text-decoration-none me-3">Pokoje</Link>
          {user && <Link to="/dashboard" className="text-white text-decoration-none">Panel Klienta</Link>}
        </div>
        
        <div>
          {user ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white-50">Witaj, <strong>{user.username}</strong>!</span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Wyloguj się</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">Logowanie</Link>
              <Link to="/register" className="btn btn-light btn-sm">Rejestracja</Link>
            </>
          )}
        </div>
      </nav>
    </header>

  );
}

export default NavPanel;
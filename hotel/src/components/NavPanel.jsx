import React from 'react';
import { NavLink } from 'react-router-dom';

const NavPanel = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      <span className="navbar-brand">Hotel</span>
      
      <div className="navbar-nav me-auto">
        <NavLink to="/" className={({ isActive }) =>'nav-link' + (isActive ? ' active fw-bold' : '')}>
          Strona główna
        </NavLink>

        <NavLink to="/rooms" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
          Pokoje
        </NavLink>

        <NavLink to="/login" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
          Logowanie
        </NavLink>

        <NavLink to="/register" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
          Rejestracja
        </NavLink>
      </div>

      <div className="navbar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => 'nav-link text-warning' + (isActive ? ' active fw-bold' : '')}>
          Panel Klienta
        </NavLink>
      </div>
      
    </div>
  </nav>
);

export default NavPanel;
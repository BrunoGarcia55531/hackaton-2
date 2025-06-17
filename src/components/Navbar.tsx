import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="navbar bg-gradient-to-r from-primary to-secondary shadow-lg mb-8 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="btn btn-ghost normal-case text-2xl text-white font-extrabold tracking-wide">Ahorrista</Link>
        <div className="flex gap-4">
          <Link to="/" className="btn btn-ghost text-white">Resumen</Link>
          <Link to="/goals" className="btn btn-ghost text-white">Metas</Link>
          {user ? (
            <>
              <span className="px-2 text-white font-semibold">{user.email}</span>
              <button className="btn btn-error btn-sm" onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline btn-secondary btn-sm">Registro</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;

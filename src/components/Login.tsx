import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://198.211.105.95:8080/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwd }),
      });
      const data = await res.json();
      if (data.status === 200) {
        login({ email: data.data.email, token: data.data.token });
      } else {
        setError(data.message || 'Error de autenticación');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 px-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-lg bg-white shadow-2xl p-10 space-y-6 border-t-8 border-primary rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-2">Iniciar sesión</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="input input-bordered w-full" />
        <input type="password" placeholder="Contraseña" value={passwd} onChange={e => setPasswd(e.target.value)} required className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full text-lg">Entrar</button>
        {error && <div className="text-error text-center font-semibold">{error}</div>}
      </form>
    </div>
  );
};
export default Login;

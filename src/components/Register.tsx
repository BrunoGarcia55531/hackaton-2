import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwd.length < 12) {
      setError('La contraseña debe tener al menos 12 caracteres.');
      return;
    }
    try {
      const res = await fetch('http://198.211.105.95:8080/authentication/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwd }),
      });
      if (res.ok) {
        setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        const data = await res.json();
        setError(data.message || 'Error de registro');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 to-base-100 px-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-md bg-white shadow-2xl p-10 space-y-6 border-t-8 border-secondary rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-secondary mb-2">Registro</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="input input-bordered w-full" />
        <input type="password" placeholder="Contraseña" value={passwd} onChange={e => setPasswd(e.target.value)} required className="input input-bordered w-full" />
        <button type="submit" className="btn btn-secondary w-full text-lg">Registrar</button>
        {error && <div className="text-error text-center font-semibold">{error}</div>}
        {success && <div className="text-success text-center font-semibold">{success}</div>}
      </form>
    </div>
  );
};
export default Register;

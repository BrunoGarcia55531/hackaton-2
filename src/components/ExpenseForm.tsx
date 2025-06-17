import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const ExpenseForm = () => {
  const { categories, setSummary } = useExpenses();
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await fetchWithAuth('http://198.211.105.95:8080/expenses', {
        method: 'POST',
        body: JSON.stringify({ description, amount: Number(amount), categoryId: Number(categoryId) }),
      }, user?.token);
      setSuccess('Gasto registrado');
      setDescription('');
      setAmount('');
      setCategoryId('');
      // Refrescar resumen
      const data = await fetchWithAuth('http://198.211.105.95:8080/expenses_summary', {}, user?.token);
      setSummary(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center my-8 px-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-md bg-white shadow-2xl p-8 space-y-4 border-l-8 border-success rounded-lg">
        <h3 className="text-xl font-bold text-center text-success">Registrar nuevo gasto</h3>
        <input placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required className="input input-bordered w-full" />
        <input type="number" placeholder="Monto" value={amount} onChange={e => setAmount(e.target.value)} required className="input input-bordered w-full" />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="select select-bordered w-full">
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success w-full">Registrar</button>
        {error && <div className="text-error text-center font-semibold">{error}</div>}
        {success && <div className="text-success text-center font-semibold">{success}</div>}
      </form>
    </div>
  );
};
export default ExpenseForm;

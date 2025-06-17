import React, { useEffect, useState } from 'react';
import { useExpenses } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const Goals = () => {
  const { goals, setGoals } = useExpenses();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      fetchWithAuth('http://198.211.105.95:8080/goals', {}, user.token)
        .then(data => setGoals(data))
        .catch(() => setGoals([]));
    }
  }, [user, setGoals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await fetchWithAuth('http://198.211.105.95:8080/goals', {
        method: 'POST',
        body: JSON.stringify({ year, month, amount: Number(amount) }),
      }, user?.token);
      setSuccess('Meta registrada');
      setAmount('');
      // Refrescar metas
      const data = await fetchWithAuth('http://198.211.105.95:8080/goals', {}, user?.token);
      setGoals(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Metas de ahorro</h2>
        <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-6 space-y-4 mb-8 border-l-8 border-secondary">
          <div className="flex gap-2">
            <input type="number" placeholder="Año" value={year} onChange={e => setYear(Number(e.target.value))} required className="input input-bordered w-1/3" />
            <input type="number" placeholder="Mes (1-12)" value={month} onChange={e => setMonth(Number(e.target.value))} required className="input input-bordered w-1/3" />
            <input type="number" placeholder="Monto" value={amount} onChange={e => setAmount(e.target.value)} required className="input input-bordered w-1/3" />
          </div>
          <button type="submit" className="btn btn-secondary w-full">Definir meta</button>
          {error && <div className="text-error text-center">{error}</div>}
          {success && <div className="text-success text-center">{success}</div>}
        </form>
        <h3 className="text-lg font-semibold mb-2">Metas registradas</h3>
        <ul className="space-y-2">
          {goals.map(g => (
            <li key={g.id} className="flex items-center justify-between bg-base-200 rounded p-2">
              <span>{g.year}-{g.month}:</span>
              <span className="badge badge-success">S/ {g.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Goals;

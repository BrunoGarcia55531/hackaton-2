import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useExpenses } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const ExpensesDetail = () => {
  const { year, month, categoryId } = useParams();
  const { details, setDetails, categories } = useExpenses();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && categoryId && !details[Number(categoryId)]) {
      setLoading(true);
      const now = new Date();
      const y = year || now.getFullYear();
      const m = month || now.getMonth() + 1;
      fetchWithAuth(`http://198.211.105.95:8080/expenses/detail?year=${y}&month=${m}&categoryId=${categoryId}`, {}, user.token)
        .then(data => setDetails(Number(categoryId), data))
        .finally(() => setLoading(false));
    }
  }, [user, categoryId, year, month, details, setDetails]);

  const cat = categories.find(c => c.id === Number(categoryId));
  const list = details[Number(categoryId)] || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-info">Detalle de gastos: {cat?.name || categoryId}</h2>
        {loading ? <div className="text-center">Cargando...</div> : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full rounded-lg">
              <thead className="bg-base-200">
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {list.map(e => (
                  <tr key={e.id}>
                    <td className="font-semibold">{e.description}</td>
                    <td><span className="badge badge-primary text-lg">S/ {e.amount.toFixed(2)}</span></td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExpensesDetail;

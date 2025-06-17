import { useEffect } from 'react';
import { useExpenses } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useNavigate } from 'react-router-dom';

const ExpensesSummary = () => {
  const { summary, setSummary, setCategories } = useExpenses();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWithAuth('http://198.211.105.95:8080/expenses_summary', {}, user.token)
        .then(data => setSummary(data))
        .catch(() => setSummary([]));
      fetchWithAuth('http://198.211.105.95:8080/expenses_category', {}, user.token)
        .then(data => setCategories(data))
        .catch(() => setCategories([]));
    }
  }, [user, setSummary, setCategories]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Resumen mensual de gastos</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th>Categoría</th>
                <th>Total</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {summary.map(s => (
                <tr key={s.categoryId}>
                  <td className="font-semibold">{s.categoryName}</td>
                  <td><span className="badge badge-primary text-lg">S/ {s.total.toFixed(2)}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-primary" onClick={() => navigate(`/category/${s.categoryId}`)}>
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ExpensesSummary;

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExpensesService } from '../services/expenses.service';
import type { Expense } from '../types/expenses';
import { ExpenseForm } from '../components/ExpenseForm';

export function ExpenseDetailPage() {
    const [searchParams] = useSearchParams(); const [expenses, setExpenses] = useState<Expense[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null); const fetchExpenses = useCallback(async () => {
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
        const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());
        const categoryId = parseInt(searchParams.get('categoryId') || '1');

        try {
            const response = await ExpensesService.getExpenseDetail({ year, month, categoryId });
            setExpenses(response.expenses);
            setTotal(response.total);
        } catch (err: any) {
            setError(err.message || 'Error al cargar los gastos');
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const handleDelete = async (id: number) => {
        try {
            setDeleteLoading(id);
            await ExpensesService.deleteExpense(id);
            await fetchExpenses(); // Recargar la lista después de eliminar
        } catch (err: any) {
            setError(err.message || 'Error al eliminar el gasto');
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <div className="text-red-700">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Detalle de Gastos</h2>
                <div className="text-lg font-semibold text-gray-700">
                    Total: ${total.toFixed(2)}
                </div>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {expenses.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {expenses.map((expense) => (
                                <li key={expense.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {expense.description}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(expense.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${expense.amount.toFixed(2)}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(expense.id)}
                                                disabled={deleteLoading === expense.id}
                                                className={`text-red-600 hover:text-red-900 ${deleteLoading === expense.id ? 'opacity-50 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                {deleteLoading === expense.id ? 'Eliminando...' : 'Eliminar'}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No hay gastos registrados para esta categoría en el período seleccionado.
                        </div>
                    )}
                </div>

                <div className="bg-white shadow sm:rounded-md p-6">
                    <ExpenseForm onSuccess={fetchExpenses} />
                </div>
            </div>
        </div>
    );
}

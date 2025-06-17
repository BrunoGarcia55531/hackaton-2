import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateExpenseRequest } from '../types/expenses';
import { ExpensesService } from '../services/expenses.service';
import { CategorySelector } from './CategorySelector';

interface ExpenseFormProps {
    onSuccess?: () => void;
}

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const expenseData: CreateExpenseRequest = {
                amount: parseFloat(amount),
                categoryId: parseInt(categoryId),
                date,
                description
            };

            await ExpensesService.createExpense(expenseData);

            // Limpiar el formulario
            setAmount('');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]);

            // Notificar éxito
            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'Error al registrar el gasto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Registrar nuevo gasto</h3>

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                </div>
            )}

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Monto
                </label>
                <input
                    type="number"
                    id="amount"
                    step="0.01"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                </label>                <CategorySelector
                    value={categoryId}
                    onChange={setCategoryId}
                    required
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Fecha
                </label>
                <input
                    type="date"
                    id="date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                </label>
                <input
                    type="text"
                    id="description"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                            ? 'bg-indigo-400'
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                >
                    {loading ? 'Registrando...' : 'Registrar gasto'}
                </button>
            </div>
        </form>
    );
}

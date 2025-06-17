import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Goal, CreateGoalRequest } from '../types/goals';

interface GoalFormProps {
    onSubmit: (goal: CreateGoalRequest) => Promise<void>;
    initialGoal?: Goal;
    onCancel?: () => void;
}

export function GoalForm({ onSubmit, initialGoal, onCancel }: GoalFormProps) {
    const [amount, setAmount] = useState(initialGoal?.amount.toString() || '');
    const [year, setYear] = useState(initialGoal?.year.toString() || new Date().getFullYear().toString());
    const [month, setMonth] = useState(initialGoal?.month.toString() || (new Date().getMonth() + 1).toString());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSubmit({
                amount: parseFloat(amount),
                year: parseInt(year),
                month: parseInt(month)
            });

            if (!initialGoal) {
                // Limpiar el formulario solo si es una nueva meta
                setAmount('');
                setYear(new Date().getFullYear().toString());
                setMonth((new Date().getMonth() + 1).toString());
            }
        } catch (err: any) {
            setError(err.message || 'Error al guardar la meta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                </div>
            )}

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Meta de ahorro
                </label>
                <input
                    type="number"
                    id="amount"
                    step="0.01"
                    min="0"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                        Mes
                    </label>
                    <select
                        id="month"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <option key={m} value={m}>
                                {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Año
                    </label>
                    <input
                        type="number"
                        id="year"
                        required
                        min={new Date().getFullYear()}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                            ? 'bg-indigo-400'
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                >
                    {loading ? 'Guardando...' : initialGoal ? 'Actualizar meta' : 'Crear meta'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

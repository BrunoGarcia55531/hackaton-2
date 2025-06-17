import { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import { GoalForm } from '../components/GoalForm';
import type { Goal } from '../types/goals';

export function GoalsPage() {
    const { goals, loading, error, createGoal, updateGoal } = useGoals();
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [showForm, setShowForm] = useState(false);

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
                <h2 className="text-2xl font-bold text-gray-900">Metas de Ahorro</h2>
                {!showForm && !editingGoal && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Nueva Meta
                    </button>
                )}
            </div>

            {(showForm || editingGoal) && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <GoalForm
                        initialGoal={editingGoal || undefined}
                        onSubmit={async (goalData) => {
                            if (editingGoal) {
                                await updateGoal(editingGoal.id, { amount: goalData.amount });
                                setEditingGoal(null);
                            } else {
                                await createGoal(goalData);
                                setShowForm(false);
                            }
                        }}
                        onCancel={() => {
                            setEditingGoal(null);
                            setShowForm(false);
                        }}
                    />
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {goals.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {goals.map((goal) => (
                            <li key={goal.id} className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            Meta para{' '}
                                            {new Date(goal.year, goal.month - 1).toLocaleString('default', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-sm text-gray-500">
                                                Progreso: ${goal.progress.toFixed(2)} de ${goal.amount.toFixed(2)}
                                            </div>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-xs">
                                                <div
                                                    className="h-2 bg-indigo-600 rounded-full"
                                                    style={{
                                                        width: `${Math.min(
                                                            (goal.progress / goal.amount) * 100,
                                                            100
                                                        )}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditingGoal(goal)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No hay metas de ahorro definidas.
                    </div>
                )}
            </div>
        </div>
    );
}

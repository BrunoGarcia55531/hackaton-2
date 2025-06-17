import { useState, useEffect } from 'react';
import { ExpensesService } from '../services/expenses.service';
import { GoalsService } from '../services/goals.service';
import { Link } from 'react-router-dom';
import type { ExpenseSummary } from '../types/expenses';
import type { Goal } from '../types/goals';
import { useNotification } from '../contexts/NotificationContext';

export function Dashboard() {
    const [expensesSummary, setExpensesSummary] = useState<ExpenseSummary[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const { showError, showSuccess } = useNotification();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [expensesData, goalsData] = await Promise.all([
                    ExpensesService.getExpensesSummary(),
                    GoalsService.getGoals()
                ]);
                setExpensesSummary(expensesData.data);
                setGoals(goalsData);
                showSuccess('Datos actualizados correctamente');
            } catch (err) {
                showError('Error al cargar los datos del dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [showError, showSuccess]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
                <div className="space-x-4">
                    <Link
                        to="/expenses/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Nuevo Gasto
                    </Link>
                    <Link
                        to="/goals/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Nueva Meta
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Tarjeta de Total por Categorías */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-indigo-600">
                        <h2 className="text-xl font-semibold text-white">Total por Categorías</h2>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-3xl font-bold text-gray-900">
                            {expensesSummary.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'EUR'
                            })}
                        </p>
                        <p className="text-sm text-gray-500">Total agregado</p>
                    </div>
                </div>

                {/* Tarjeta de Metas Activas */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-green-600">
                        <h2 className="text-xl font-semibold text-white">Metas Activas</h2>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
                        <p className="text-sm text-gray-500">En progreso</p>
                    </div>
                </div>

                {/* Tarjeta de Categoría Principal */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-purple-600">
                        <h2 className="text-xl font-semibold text-white">Categoría Principal</h2>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-3xl font-bold text-gray-900">
                            {expensesSummary.length > 0 ? expensesSummary[0].category : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {expensesSummary.length > 0 ? `${expensesSummary[0].percentage}% del total` : '0%'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resumen de Gastos */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        {expensesSummary.length > 0 ? (
                            <div className="space-y-4">
                                {expensesSummary.map((summary) => (
                                    <div key={summary.category} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full" style={{
                                                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`
                                            }}></div>
                                            <span className="text-gray-700">{summary.category}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-900 font-medium">
                                                ${summary.total.toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                ({summary.percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No hay gastos registrados este mes.</p>
                        )}
                    </div>
                </div>

                {/* Detalle de Gastos por Categoría */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-indigo-600">
                        <h2 className="text-xl font-semibold text-white">Detalle de Gastos por Categoría</h2>
                    </div>
                    <div className="px-6 py-4">
                        {expensesSummary.map((expense, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">{expense.category}</span>
                                    <span className="text-sm text-gray-600">{expense.percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 rounded-full"
                                        style={{ width: `${expense.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metas de Ahorro */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-green-600">
                        <h2 className="text-xl font-semibold text-white">Metas de Ahorro</h2>
                    </div>
                    <div className="px-6 py-4">
                        {goals.length > 0 ? (
                            goals.map((goal) => (
                                <div key={goal.id} className="mb-4 last:mb-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Meta {goal.month}/{goal.year}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {goal.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-600 rounded-full"
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {goal.progress >= 100 ? '¡Meta alcanzada!' : `${((goal.amount * (100 - goal.progress)) / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} restantes`}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">No hay metas activas</p>
                                <Link
                                    to="/goals/new"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Crear Nueva Meta
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        to="/expenses/new"
                        className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 text-xl">+</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Nuevo Gasto</p>
                            <p className="text-xs text-gray-500">Registrar un nuevo gasto</p>
                        </div>
                    </Link>

                    <Link
                        to="/goals/new"
                        className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 text-xl">🎯</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Nueva Meta</p>
                            <p className="text-xs text-gray-500">Establecer meta de ahorro</p>
                        </div>
                    </Link>

                    <Link
                        to="/expenses"
                        className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xl">📊</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Ver Gastos</p>
                            <p className="text-xs text-gray-500">Lista detallada de gastos</p>
                        </div>
                    </Link>

                    <Link
                        to="/goals"
                        className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 text-xl">📈</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Ver Metas</p>
                            <p className="text-xs text-gray-500">Seguimiento de metas</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

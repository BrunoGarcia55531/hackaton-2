import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

export function HomePage() {
    const navigate = useNavigate();
    const isAuthenticated = AuthService.isAuthenticated();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Control de Gastos</span>
                    <span className="block text-indigo-600">Gestiona tus finanzas</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Administra tus gastos, establece metas de ahorro y mantén el control de tus finanzas personales.
                </p>
                <div className="mt-10 flex justify-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => navigate('/expenses/detail')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Ver mis gastos
                            </button>
                            <button
                                onClick={() => navigate('/goals')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                            >
                                Metas de ahorro
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/register')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white !bg-indigo-600 hover:!bg-indigo-800 !transition-colors duration-500 ease-in-out"
                            >
                                Registrarse
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center px-6 py-3 border text-base font-medium rounded-md !text-indigo-600 !bg-white hover:!bg-gray-200 !border-indigo-600 !transition-colors duration-500 ease-in-out"
                            >
                                Iniciar sesión
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Características principales */}
            <div className="py-12 bg-white">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Características</h2>
                    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                📊
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900">Control de Gastos</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Registra y categoriza tus gastos diarios para mantener un control detallado.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                🎯
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900">Metas de Ahorro</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Establece objetivos de ahorro mensuales y haz seguimiento de tu progreso.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                📈
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900">Análisis y Estadísticas</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Visualiza resúmenes y estadísticas de tus gastos por categoría.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

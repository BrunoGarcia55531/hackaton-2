import type { ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const navigate = useNavigate();
    const isAuthenticated = AuthService.isAuthenticated();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white w-full shadow-md sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-xl font-bold hover:!text-indigo-800 transition-colors">
                                    Control de Gastos
                                </Link>
                            </div>
                            {isAuthenticated && (
                                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/expenses/detail"
                                        className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
                                    >
                                        Mis Gastos
                                    </Link>
                                    <Link
                                        to="/goals"
                                        className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
                                    >
                                        Metas
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Cerrar sesión
                                </button>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="hover:!text-indigo-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md !text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            <footer className="bg-white shadow-md mt-auto">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Control de Gastos. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
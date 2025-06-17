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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <nav className="container mx-auto px-4 py-6 flex justify-between items-center">                    <div className="flex items-center space-x-8">
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        Gastos App
                    </Link>
                    {isAuthenticated && (
                        <div className="flex space-x-6">
                            <Link to="/expenses/detail" className="text-gray-600 hover:text-gray-900">
                                Mis Gastos
                            </Link>
                            <Link to="/goals" className="text-gray-600 hover:text-gray-900">
                                Metas de Ahorro
                            </Link>
                        </div>
                    )}
                </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                                    Iniciar sesión
                                </Link>
                                <Link to="/register" className="text-indigo-600 hover:text-indigo-900">
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}

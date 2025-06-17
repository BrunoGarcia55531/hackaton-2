import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthService } from '../services/auth.service';

interface AuthGuardProps {
    children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const location = useLocation();

    if (!AuthService.isAuthenticated()) {
        // Redirigir a /login, pero guardar la ubicación actual
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

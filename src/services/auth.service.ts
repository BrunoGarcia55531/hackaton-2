import { axiosPost } from '../api';
import type { RegisterRequest, AuthResponse, LoginRequest, LoginResponse } from '../types/auth';

const BASE_URL = 'http://198.211.105.95:8080/authentication';

export class AuthService {
    static async register(email: string, password: string, name?: string): Promise<AuthResponse> {
        try {
            if (password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }

            const data: RegisterRequest = {
                email,
                passwd: password,
                name
            };
            const response = await axiosPost<AuthResponse>(`${BASE_URL}/register`, data, false);
            return response;
        } catch (error: any) {
            if (error.response?.status === 400) {
                throw new Error('El correo electrónico ya está registrado');
            }
            throw error;
        }
    }

    static async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const data: LoginRequest = {
                email,
                passwd: password
            }; const response = await axiosPost<LoginResponse>(`${BASE_URL}/login`, data, false);

            // Guardar el token en localStorage para su uso posterior
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }

            return response;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Credenciales inválidas');
            }
            throw new Error('Error al iniciar sesión');
        }
    }

    static isAuthenticated(): boolean {
        const token = localStorage.getItem('auth_token');
        return !!token;
    }

    static logout(): void {
        localStorage.removeItem('auth_token');
    }

    static getToken(): string | null {
        return localStorage.getItem('auth_token');
    }
}

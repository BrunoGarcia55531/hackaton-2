import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

// Función auxiliar para obtener el token
const getAuthToken = () => localStorage.getItem('auth_token');

// Configuración por defecto para las llamadas autenticadas
const getAuthConfig = (): AxiosRequestConfig => {
    const token = getAuthToken();
    return {
        headers: token ? {
            'Authorization': `Bearer ${token}`
        } : {}
    };
};

export const axiosGet = async <T>(url: string, requiresAuth: boolean = true): Promise<T> => {
    const config = requiresAuth ? getAuthConfig() : {};
    const response: AxiosResponse<T> = await axios.get(url, config);
    return response.data;
};

export const axiosPost = async <T>(url: string, data: any, requiresAuth: boolean = true): Promise<T> => {
    const config = requiresAuth ? getAuthConfig() : {};
    const response: AxiosResponse<T> = await axios.post(url, data, config);
    return response.data;
};

export const axiosPut = async <T>(url: string, data: any, requiresAuth: boolean = true): Promise<T> => {
    const config = requiresAuth ? getAuthConfig() : {};
    const response: AxiosResponse<T> = await axios.put(url, data, config);
    return response.data;
};

export const axiosDelete = async <T>(url: string, requiresAuth: boolean = true): Promise<T> => {
    const config = requiresAuth ? getAuthConfig() : {};
    const response: AxiosResponse<T> = await axios.delete(url, config);
    return response.data;
};
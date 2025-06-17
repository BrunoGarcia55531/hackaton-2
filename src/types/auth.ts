export interface RegisterRequest {
    email: string;
    passwd: string;
    name?: string;
}

export interface LoginRequest {
    email: string;
    passwd: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    data: {
        token: string;
        email: string;
        name?: string;
    };
}

export interface AuthResponse {
    token: string;
    error?: string;
    name?: string;
}

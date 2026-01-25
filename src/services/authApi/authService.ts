import apiClient from '../api';
import { AUTH_ENDPOINTS, OTP_ENDPOINTS } from './authApi';

// Auth Service Methods
export const authService = {
    register: (userData: any) => {
        return apiClient.post(AUTH_ENDPOINTS.REGISTER, {
            ...userData,
            role: "NURSE",
        });
    },
    login: (credentials: any) => {
        return apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    },
    logout: () => {
        return apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    },
    refresh: (refreshToken: string) => {
        return apiClient.post(AUTH_ENDPOINTS.REFRESH, { refreshToken });
    },
};

// OTP Service Methods
export const otpService = {
    send: (email: string) => {
        return apiClient.post(OTP_ENDPOINTS.SEND, { email });
    },
    verify: (payload: { email: string; enteredOtp: string }) => {
        return apiClient.post(OTP_ENDPOINTS.VERIFY, payload);
    },
};

export default {
    ...authService,
    ...otpService,
};

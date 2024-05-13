// import { getItem } from '@/utils/local-storage';
import { getItem, removeItem, setItem } from '@/utils/local-storage';
import axios, { AxiosHeaders } from 'axios';

const client = axios.create({
    baseURL: 'https://main--stellular-fenglisu-e2b691.netlify.app/api'
});


const clientWithAuth = axios.create({
    baseURL: 'https://main--stellular-fenglisu-e2b691.netlify.app/api'
});

clientWithAuth.interceptors.request.use(
    config => {
        // Here we should get the token from the local storage and add it into the Authorization.
        const token = getItem('token');
        config.headers['Authorization'] = token;
        return config;
    },
    error => Promise.reject(error)
);

clientWithAuth.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                // Make a request to your auth server to refresh the token.
                const response = await axios.get('https://main--stellular-fenglisu-e2b691.netlify.app/api/auth/refresh-token',
                    { withCredentials: true }
                );
                const token = (response.headers as AxiosHeaders).getAuthorization()?.toString() || null;
                // Store the new access and refresh tokens.
                setItem({ key: 'token', value: token });
                // Update the authorization header with the new access token.
                return clientWithAuth(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error('Token Refresh failed');
                removeItem({ key: 'user' });
                removeItem({ key: 'token' });
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export {
    client,
    clientWithAuth
};
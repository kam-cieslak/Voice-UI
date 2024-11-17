import axios from "axios";

const API_URL = "http://localhost:8080/api"
const TIMEOUT_MS = 30000;

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const apiWithConfig = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT_MS,
    headers: DEFAULT_HEADERS
})

export function setupInterceptors() {
    console.log("axios: setupInterceptors");
    apiWithConfig.interceptors.request.clear();
    apiWithConfig.interceptors.response.clear();

    apiWithConfig.interceptors.request.use((config) => {
        const token = window.localStorage.getItem('token')
        if (token && config.headers) config.headers.Authorization = token;

        return config
    })

    apiWithConfig.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error.response?.status
            if (status === 401) {
                console.log("axios: 401");
                localStorage.removeItem('token');
            }

            return Promise.reject(error)
        }
    )
}
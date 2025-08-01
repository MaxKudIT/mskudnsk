import axios, {AxiosError, AxiosRequestConfig} from "axios";

const host = process.env.REACT_APP_HOST

export const v1 = axios.create({baseURL: `http://${host}:3000/`})
v1.interceptors.response.use(
    response => response,
    async (error: AxiosError<{error: string}>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _isRetry?: boolean };
        console.log(error?.response)
        if (error?.response?.status === 403 && error?.response?.data?.error === 'token is expired' && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                 await axios.post('/accesstoken', {}, {
                    withCredentials: true
                });
            } catch (refreshError) {

                window.location.replace('http://localhost:3001/auth')
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
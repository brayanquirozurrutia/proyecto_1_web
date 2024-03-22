import axios, {AxiosResponse} from 'axios';

const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const LoginUrl = import.meta.env.VITE_USER_LOGIN_URL;
const LoginTokenUrl = import.meta.env.VITE_USER_LOGIN_TOKEN_URL;

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    detail: string;
    status: boolean;
}

interface TokenResponse {
    access: string;
    refresh: string;
}

export async function postData(loginData: LoginData): Promise<AxiosResponse<LoginResponse>> {
    try {
        return await axios.post<LoginResponse>(
            `${BackendUrl}${LoginUrl}`,
            {...loginData},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data.detail || 'An error occurred while processing your request. Please try again later.');
        } else {
            return Promise.reject((error as Error).message);
        }
    }
}

export async function postToken(loginData: LoginData): Promise<AxiosResponse<TokenResponse>> {
    try {
        return await axios.post<TokenResponse>(
            `${BackendUrl}${LoginTokenUrl}`,
            {...loginData},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data.detail || 'An error occurred while processing your request. Please try again later.');
        } else {
            return Promise.reject((error as Error).message);
        }
    }
}

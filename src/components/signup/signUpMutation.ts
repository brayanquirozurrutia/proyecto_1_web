import axios, {AxiosResponse} from 'axios';

const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const SignUpUrl = import.meta.env.VITE_USER_CREATE_ACCOUNT_URL;

interface SignUpData {
    first_name: string;
    last_name: string;
    rut: string;
    email: string;
    password: string;
    gender: string;
}

export async function postSignUp(signUpData: SignUpData): Promise<AxiosResponse> {
    try {
        return await axios.post(
            `${BackendUrl}${SignUpUrl}`,
            {...signUpData},
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
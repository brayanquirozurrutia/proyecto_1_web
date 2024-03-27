import axios, { AxiosResponse } from 'axios';

const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

interface Data {
    email: string;
}

export async function postNewAToken(newTokenData: Data, url: string): Promise<AxiosResponse> {
    try {
        return await axios.post(
            `${BackendUrl}${url}`,
            newTokenData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(
                error.response?.data.detail ||
                error.response?.data.error ||
                'An error occurred while processing your request. Please try again later.'
            );
        } else {
            return Promise.reject((error as Error).message);
        }
    }
}

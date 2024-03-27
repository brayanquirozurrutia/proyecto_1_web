import axios, { AxiosResponse } from 'axios';

const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const ActivateAccountUrl = import.meta.env.VITE_ACTIVATE_ACCOUNT_URL;

interface ActivateAccountData {
    code: string;
}

export async function getActivateAccount(activateAccountData: ActivateAccountData): Promise<AxiosResponse> {
    try {
        const url = `${BackendUrl}${ActivateAccountUrl}`.replace('{id}', activateAccountData.code);

        return await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
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

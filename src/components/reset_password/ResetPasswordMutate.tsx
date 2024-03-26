import axios, { AxiosResponse } from 'axios';

const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
const ResetPaswordUrl = import.meta.env.VITE_RESET_PASSWORD_URL as string;

interface ResetPasswordData {
    code: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export async function patchResetPassword(resetPasswordData: ResetPasswordData): Promise<AxiosResponse> {
    try {
        const url = `${BackendUrl}${ResetPaswordUrl}`.replace('{id}', resetPasswordData.code);

        return await axios.patch(url, {
            newPassword: resetPasswordData.newPassword,
            newPasswordConfirm: resetPasswordData.newPasswordConfirm
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.response?.data.detail || 'An error occurred while processing your request. Please try again later.');
        } else {
            return Promise.reject((error as Error).message);
        }
    }
}

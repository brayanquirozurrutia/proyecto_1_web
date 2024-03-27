import NewToken from "../general/NewToken.tsx";

const NewTokenUrl = import.meta.env.VITE_NEW_RESET_PASSWORD_TOKEN_URL as string;

const ResetPasswordNewToken = () => {
    return (
        <div>
            <NewToken TokenUrl={NewTokenUrl} />
        </div>
    );
}

export default ResetPasswordNewToken;
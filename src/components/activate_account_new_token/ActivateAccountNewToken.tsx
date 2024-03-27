import NewToken from "../general/NewToken.tsx";

const NewTokenUrl = import.meta.env.VITE_NEW_ACTIVATE_ACCOUNT_TOKEN_URL

const ActivateAccountNewToken = () => {
    return (
        <div>
            <NewToken TokenUrl={NewTokenUrl} />
        </div>
    );
}

export default ActivateAccountNewToken;

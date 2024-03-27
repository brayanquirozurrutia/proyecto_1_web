import React, {useState} from "react";
import { customStyles } from "../../constants/styles.ts";
import AuthMessageProps from "../general/AuthMessageProps.tsx";
import { postNewAToken } from "../../utils/mutates/NewTokenMutate.tsx";
import AlertBootstrap from "../Bootstrap/AlertBootstrap.tsx";

interface ActivateAccountNewTokenProps {
    TokenUrl: string;
}

const ActivateAccountNewToken: React.FC<ActivateAccountNewTokenProps> = ({
    TokenUrl,
                                                                        }) => {
    const [email, setEmail] = React.useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await postNewAToken({email }, TokenUrl);
            setSuccess("A new token has been sent to your email. Please check your email and follow the instructions.");
            setError(null);
        } catch (error) {
            if (error === 'Not found.') {
                setError('Email not found.');
            } else {
                setError(error as string || 'An error occurred while processing your request. Please try again later.');
            }
        }
    };

    return (
        <div className={`${customStyles.customBackground} pt-4`}>
            <AuthMessageProps subTitle={"New activation token"} />
            <div className={"flex flex-col px-20 py-4"}>
                <form
                    onSubmit={handleSubmit}
                    id={"activateAccountNewToken"}
                    name={"activateAccountNewToken"}
                >
                    <div className={""}>
                        <label
                            htmlFor={"email"}
                            className={customStyles.labelText}
                        >Email</label>
                        <input
                            autoComplete={"email"}
                            type={"email"}
                            id={"email"}
                            name={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${customStyles.customInput} mb-4`}
                            required={true}
                        />
                    </div>
                    <button type="submit" className={customStyles.customButton}>
                        Get new token
                    </button>
                    <div className={"pt-2"}>
                        {error && <AlertBootstrap message={error} variant="danger"/>}
                    </div>
                    <div className={"pt-2"}>
                        {success &&
                            <AlertBootstrap message={success} variant="primary"/>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActivateAccountNewToken;

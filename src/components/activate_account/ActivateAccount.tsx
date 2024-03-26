import React, { useState, useRef} from 'react';
import { customStyles } from "../../constants/styles.ts";
import AuthMessageProps from "../general/AuthMessageProps.tsx";
import { getActivateAccount } from "./ActivateAccountMutation.tsx";
import {Link, useNavigate} from "react-router-dom";
import AlertBootstrap from "../Bootstrap/AlertBootstrap.tsx";
import NeighborhoodLogo from "../general/NeighborhoodLogo.tsx";

interface ActivateAccountProps { }

const ActivateAccount: React.FC<ActivateAccountProps> = () => {
    const [activationCode, setActivationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    const handleActivation = async () => {
        if (activationCode.some(code => code === "")) {
            setError("Please fill in all activation code fields.");
            return;
        }
        try {
            const code = activationCode.join("");
            await getActivateAccount({ code });
            setError(null);
            setSuccess("Account activated successfully. You will be redirected to the login page shortly..");
            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (error) {
            setError(error as string || 'An error occurred while processing your request. Please try again later.');
        }
    };
    const handleInputChange = (index: number, value: string) => {
        const newCode = [...activationCode];
        newCode[index] = value;
        setActivationCode(newCode);
        const nextInput = inputRefs.current[index + 1];
        if (value.length === 1 && index < activationCode.length - 1 && nextInput) {
            nextInput.focus();
        }
    };
    return (
        <div className={`${customStyles.customBackground} pt-4`}>
            <AuthMessageProps subTitle={"Reset password"}/>
            <div className={"flex flex-col px-20 py-4"}>
                <div className={"flex flex-col items-center"}>
                    <p className={"pb-2"}>Enter your account activation code in the box</p>
                    <div className="flex mb-4 justify-center">
                        {activationCode.map((value, index) => (
                            <input
                                required={true}
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className={`${customStyles.customInput}text-center mr-2`}
                                type={"text"}
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <button className={customStyles.customButton} onClick={handleActivation}>
                        Activate Account
                    </button>
                    <div className={"pt-2"}>
                        {error && <AlertBootstrap message={error} variant="danger"/>}
                    </div>
                    <div className={"pt-2"}>
                        {success &&
                            <AlertBootstrap message={success} variant="primary"/>
                        }
                    </div>
                </div>
                <div className="text-center pb-4">
                    <Link to="" className={"font-bold hover:underline hover:underline-offset-2"}>Has your code
                        expired?</Link>
                </div>
                <div className={"basis-1/2"}>
                    <NeighborhoodLogo></NeighborhoodLogo>
                </div>
            </div>
        </div>
    );
};

export default ActivateAccount;

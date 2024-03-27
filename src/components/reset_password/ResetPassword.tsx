import React, { useState, useRef } from 'react';
import { customStyles } from "../../constants/styles.ts";
import AuthMessageProps from "../general/AuthMessageProps.tsx";
import { patchResetPassword } from "./ResetPasswordMutate.tsx";
import { Link, useNavigate } from "react-router-dom";
import AlertBootstrap from "../Bootstrap/AlertBootstrap.tsx";
import NeighborhoodLogo from "../general/NeighborhoodLogo.tsx";

interface ActivateAccountProps { }

const ResetPassword: React.FC<ActivateAccountProps> = () => {
    const [activationCode, setActivationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [passwordRequirements, setPasswordRequirements] = useState<{ requirement: string; fulfilled: boolean }[]>([]);

    const handleActivation = async () => {
        if (activationCode.some(code => code === "")) {
            setError("Please fill in all activation code fields.");
            return;
        } else if (passwordStrength < 5) {
            setError('Password must meet all requirements');
            return;
        }
        try {
            const code = activationCode.join("");
            await patchResetPassword({ code: code, newPassword: password, newPasswordConfirm: newPassword});
            setError(null);
            setSuccess("Account activated successfully. You will be redirected to the login page shortly..");
            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (error) {
            if (error === 'Not found.') {
                setError('Invalid code. Please try again or request a new code.');
            } else {
                setError(error as string || 'An error occurred while processing your request. Please try again later.');
            }
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleActivation();
        } catch (error) {
            console.error('Error during activation:', error);
        }
    };

    const handleInputChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        calculatePasswordStrength(e.target.value);
    };
    const rePasswordHandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        calculatePasswordStrength(e.target.value);
    };

    const calculatePasswordStrength = (value: string) => {
        let strength = 0;
        const requirements: { requirement: string; fulfilled: boolean }[] = [];

        // Comprobar la longitud mínima
        if (value.length >= 8) {
            strength += 1;
            requirements.push({requirement: "At least 8 characters", fulfilled: true});
        } else {
            requirements.push({requirement: "At least 8 characters", fulfilled: false});
        }

        // Comprobar si contiene números
        if (/\d/.test(value)) {
            strength += 1;
            requirements.push({requirement: "At least one number", fulfilled: true});
        } else {
            requirements.push({requirement: "At least one number", fulfilled: false});
        }

        // Comprobar si contiene mayúsculas
        if (/[A-Z]/.test(value)) {
            strength += 1;
            requirements.push({requirement: "At least one uppercase letter", fulfilled: true});
        } else {
            requirements.push({requirement: "At least one uppercase letter", fulfilled: false});
        }

        // Comprobar si contiene caracteres especiales
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            strength += 1;
            requirements.push({requirement: "At least one special character", fulfilled: true});
        } else {
            requirements.push({requirement: "At least one special character", fulfilled: false});
        }

        // Verificar si las contraseñas coinciden si ambos campos tienen contenido y son idénticos
        if ((value === password && value !== '' && password !== '') ||
            (value === newPassword && value !== '' && newPassword !== '')
        ) {
            strength += 1;
            requirements.push({requirement: "Passwords match", fulfilled: true});
        } else {
            requirements.push({requirement: "Passwords match", fulfilled: false});
        }

        setPasswordStrength(strength);
        setPasswordRequirements(requirements);
    };

    const isPasswordNotEmpty = () => {
        return password.trim() !== '' && newPassword.trim() !== '';
    };
    return (
        <div className={`${customStyles.customBackground} pt-4`}>
            <AuthMessageProps subTitle={"Reset password"} />
            <form onSubmit={handleSubmit} id={"resetPasswordForm"}>
                <div className={"flex flex-col px-20 py-4"}>
                    <div className={"flex flex-col items-center"}>
                        <p className={"pb-2"}>Enter your account activation code in the box</p>
                        <div className="flex mb-4 justify-center">
                            {activationCode.map((value, index) => (
                                <input
                                    required={true}
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className={`${customStyles.customInput} text-center mr-2 shadow-xl`}
                                    type={"text"}
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <div className={"flex-row"}>
                            <div className={""}>
                                <label className={customStyles.labelText}
                                       htmlFor="password"
                                >
                                    Enter your password
                                </label>
                                <input
                                    id={"password"}
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        handleInputChangePassword(e);
                                    }}
                                    className={`${customStyles.customInput} mb-4`}
                                    required={true}
                                />
                            </div>
                            <div className={""}>
                                <label className={customStyles.labelText}
                                htmlFor={"new_password"}>
                                    Confirm password
                                </label>
                                <input
                                    id={"new_password"}
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        rePasswordHandleInputChange(e);
                                    }}
                                    className={`${customStyles.customInput} mb-4`}
                                    required={true}
                                />
                            </div>
                            {isPasswordNotEmpty() && (
                                <div className={customStyles.signUpRow}>
                                    <div className={customStyles.passwordRequirements}>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped"
                                                 role="progressbar"
                                                 aria-label="Basic example"
                                                 aria-valuenow={passwordStrength}
                                                 aria-valuemin={0}
                                                 aria-valuemax={100}
                                                 style={{width: `${passwordStrength * 25}%`}}
                                            />
                                        </div>
                                        <ul>
                                            {passwordRequirements.map((requirement, index) => (
                                                <li key={index} style={{color: requirement.fulfilled ? 'rgb(0,0,0)' : 'rgb(255,0,0)'}}>
                                                    {requirement.requirement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="submit" className={customStyles.customButton}>
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
            </form>
        </div>
    );
};

export default ResetPassword;

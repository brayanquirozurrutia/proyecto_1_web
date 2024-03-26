import React from 'react';

interface AuthMessageProps {
    subTitle: string;
}

const AuthMessage: React.FC<AuthMessageProps> = ({ subTitle}) => {
    return (
        <div>
            <div className={"text-center"}>
                <h1 className="font-bold text-3xl pb-4">Neighborhood</h1>
                <h2 className={"text-xl"}>{subTitle}</h2>
            </div>
        </div>
    );
};

export default AuthMessage;

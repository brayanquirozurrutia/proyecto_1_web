import React from "react";
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface AlertBootstrapProps {
  message: string;
  variant: string;
}

const AlertBootstrap: React.FC<AlertBootstrapProps> = ({ message, variant }) => {
  return (
    <Alert variant={variant}>
      {variant === 'danger' && (
        <FontAwesomeIcon icon={faCircleExclamation} bounce className="mr-1 size-5 text-black"/>
      )}
      {message}
    </Alert>
  );
}

export default AlertBootstrap;

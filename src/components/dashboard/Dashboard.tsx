// Dashboard.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Dashboard: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar el componente
        if (!isLoggedIn) {
            // Redireccionar al usuario a la página de inicio de sesión si no está autenticado
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        // Si el usuario no está autenticado, no renderizar el contenido del dashboard
        return null;
    }

    // Renderizar el contenido del dashboard si el usuario está autenticado
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                Hola *-*
            </div>
        </div>
    );
};

export default Dashboard;

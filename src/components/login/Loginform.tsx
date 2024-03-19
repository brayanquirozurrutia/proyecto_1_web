import React, { useState, useEffect } from "react";
import AlertBootstrap from "../Bootstrap/AlertBootstrap";
import { useNavigate } from 'react-router-dom';

// Definición de la estructura de datos para enviar al endpoint
interface LoginRequest {
  email: string;
  password: string;
}

// Definición de la estructura de datos para recibir del endpoint
interface TokenResponse {
  access: string;
  refresh: string;
}

// Definición de la estructura de datos para la respuesta de error
interface ErrorResponse {
  detail: string;
  status: boolean;
}

const BackendUrl =  import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
const LoginUrl =  import.meta.env.VITE_USER_LOGIN_URL as string;
const LoginTokenUrl = import.meta.env.VITE_USER_LOGIN_TOKEN_URL as string;


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verificamos que los campos no estén vacíos
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      // Construimos el objeto de solicitud con la estructura definida
      const requestData: LoginRequest = {
        email,
        password
      };
      const response = await fetch(`${BackendUrl}${LoginUrl}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const errorResponse: ErrorResponse = responseData;
        if (response.status) {
          throw new Error(errorResponse.detail || "Authentication error");
        } else {
          throw new Error("Network response was not ok");
        }
      } else {
        const tokenResponse = await fetch(`${BackendUrl}${LoginTokenUrl}`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const tokenData: TokenResponse = await tokenResponse.json();
        if (!tokenResponse.ok) {
          throw new Error("Network response was not ok");
        } else {
          const { access, refresh } = tokenData;
          setTokens(access, refresh);
          navigateTo('/dashboard')
        }
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // Función para establecer los tokens y guardarlos en el almacenamiento local
  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  // Función para cargar los tokens desde el almacenamiento local al cargar la página
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      // Aquí podrías realizar alguna acción adicional si lo necesitas
    }
  }, []);
  const handleSignUpClick = () => {
    // Redirige al usuario a la ruta de registro
    navigateTo('/signup');
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex-col">
            <div className="py-1">
              <label htmlFor="email" className="text-slate-700">
                Email
              </label>
            </div>
            <div>
              <input
                  required={true}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded py-2 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl
                  invalid:border-pink-500 invalid:text-pink-600 focus:inalid:border-pink-500 focus:invalid:ring-pink-300"
                  placeholder="m@example.com"
              />
            </div>
          </div>
          <div className="mb-4 flex-col">
            <div className="py-1">
              <label htmlFor="password" className="text-slate-700">
                Password
              </label>
            </div>
            <div>
              <input
                  required={true}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 rounded py-2 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl
                  invalid:border-pink-500 invalid:text-pink-600 focus:inalid:border-pink-500 focus:invalid:ring-pink-300"
              />
            </div>
          </div>
          {error && <AlertBootstrap message={error} variant="danger" />}
          <div className="mb-4 text-white font-bold">
            <button
                type="submit"
                className="trasition transition ease-in-out delay-100 bg-gray-950 rounded w-full py-2 hover:-translate-y-1 hover:scale-110 hover:bg-sky-800 duration-300 hover:shadow-2xl"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <a href="" className="underline underline-offset-2">
            Forgot Password?
          </a>
        </div>
        <div className="font-bold hover:underline hover:underline-offset-2 text-center">
          <a href="" onClick={handleSignUpClick}>Sign up for an account?</a>
        </div>
      </div>
  );
}

export default LoginForm;

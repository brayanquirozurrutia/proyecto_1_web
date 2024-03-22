import React, { useState } from "react";
import AlertBootstrap from "../Bootstrap/AlertBootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postData, postToken } from './authMutation.ts';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const loginMutation = useMutation(postData);
  const tokenMutation = useMutation(postToken);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const loginResult = await loginMutation.mutateAsync({ email, password });
      if (loginResult.data.status) {
        const tokenResult = await tokenMutation.mutateAsync({ email, password });
        setTokens(tokenResult.data.access, tokenResult.data.refresh);
        navigateTo('/dashboard');
      }
    } catch (error) {
      setError(error as string);
    }
  };
  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
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
          <Link to="/signup">Sign up for an account?</Link>
        </div>
      </div>
  );
}

export default LoginForm;

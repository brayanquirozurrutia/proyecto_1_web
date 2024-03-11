import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://proyecto-1-5d0g.onrender.com/neighborhood/v1/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      if (!data) {
        console.error("Empty response");
        return;
      }

      console.log("Authentication success:", data);
      localStorage.setItem("token", data.access);
    } catch (error) {
      console.error("Authentication error:", error);
    }
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
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl"
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-gray-950 text-white rounded w-full py-1 hover:bg-gray-800 hover:shadow-2xl"
          >
            Sign In
          </button>
        </div>
        <div className="mb-4 text-center">
          <a href="" className="underline underline-offset-2">
            Forgot Password?
          </a>
        </div>
        <div className="mb-4 font-bold hover:underline hover:underline-offset-2">
          <a href="">Sign up for an account?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

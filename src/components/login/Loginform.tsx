function LoginForm() {
  return (
    <div>
      <form action="">
        <div className="mb-4 flex-col">
          <div className="py-1">
            <label htmlFor="" className="text-slate-700">
              Email
            </label>
          </div>
          <div>
            <input
              type="email"
              className="border border-gray-400 rounded py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl"
              placeholder="m@example.com"
            />
          </div>
        </div>
        <div className="mb-4 flex-col">
          <div className="py-1">
            <label htmlFor="" className="text-slate-700">
              Password
            </label>
          </div>
          <div>
            <input
              type="password"
              className="border border-gray-400 rounded py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-500 focus:shadow-2xl"
            />
          </div>
        </div>
        <div className="mb-4">
          <button className="bg-gray-950 text-white rounded w-full py-1 hover:bg-gray-800 hover:shadow-2xl">
            Sign In
          </button>
        </div>
        <div className="mb-4 text-center">
          <a href="" className="underline underline-offset-2">Forgot Password?</a>
        </div>
        <div className="mb-4 font-bold hover:underline hover:underline-offset-2">
          <a href="">Sign up for an account?</a>
        </div>
      </form>
    </div>
  );
}


export default LoginForm;

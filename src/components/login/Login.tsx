
import LoginText from "./LoginText";
import LoginForm from "./Loginform";
import NeighborhoodLogo from "../NeighborhoodLogo";

function Login() {
  return (
    <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 bg-slate-200 shadow-2xl rounded-2xl mx-auto p-2 my-4">
      <div className="flex justify-center">
        <div className="w-full sm:w-10/12 md:w-9/12 xl:w-7/12 px-10 py-10">
          <LoginText />
          <LoginForm />
        </div>
        <div className="w-full hidden lg:block lg:w-1/2">
        <NeighborhoodLogo/>
        </div>
      </div>
    </div>
  );
}

export default Login;

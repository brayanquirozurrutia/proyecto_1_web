import LoginText from "./LoginText";
import LoginForm from "./Loginform";
import NeighborhoodLogo from "../general/NeighborhoodLogo.tsx";
import FooterText from "../general/FooterText.tsx";

function Login() {
  return (
    <div >
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12
      shadow-2xl rounded-lg mx-auto p-2 my-4
      bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-9/12 xl:w-7/12 px-10 py-10">
            <LoginText />
            <LoginForm />
          </div>
          <div className="w-full hidden lg:block lg:w-1/2">
            <NeighborhoodLogo />
          </div>
        </div>
      </div>
      <div className="sm:pb-4 md:pb-4 lg:pb-3 xl:pb-2 2xl:pb-1">
        <FooterText />
      </div>
    </div>
  );
}

export default Login;

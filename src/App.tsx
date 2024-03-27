import Login from "./components/login/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard.tsx";
import SignUp from "./components/signup/SignUp.tsx";
import ActivateAccount from "./components/activate_account/ActivateAccount.tsx";
import ResetPassword from "./components/reset_password/ResetPassword.tsx";
import ActivateAccountNewToken from "./components/activate_account_new_token/ActivateAccountNewToken.tsx";
import ResetPasswordNewToken from "./components/reset_password_new_token/ResetPasswordNewToken.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/activate-account" element={<ActivateAccount />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/activate-account-new-token" element={<ActivateAccountNewToken />} />
                <Route path="/reset-password-new-token" element={<ResetPasswordNewToken />} />
            </Routes>
        </Router>
    );
}

export default App;

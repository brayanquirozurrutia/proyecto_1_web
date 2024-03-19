import Login from "./components/login/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard.tsx";
import SignUp from "./components/signup/SignUp.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;

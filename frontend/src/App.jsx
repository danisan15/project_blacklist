import LandingPage from "./components/LandingPage";
import Form from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import ConfirmEmail from "./components/ConfirmEmail";
import Support from "./components/Support";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;

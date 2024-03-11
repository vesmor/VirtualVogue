import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Login from "./Login"
import SignInFirst from "./SignInFirst";
import Signup from "./Signup";

const isAuthenticated = () => {
  // return !!localStorage.getItem("token");
  return true; // Temporarily hard-coded to always return true
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path="/signin-first" element={<SignInFirst />} />
        {/* Do this for all the other routes */}
        <Route
          path="/home"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/signin-first" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

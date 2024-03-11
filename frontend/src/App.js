import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Login from "./Login"
//import SignUp from "./signup"
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path = "/login" element = {<Login />} />
      
      </Routes>
    </Router>
  );
}

export default App;

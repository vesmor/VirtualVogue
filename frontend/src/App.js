import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App bg-light text-dark">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Virtual Vogue</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="display-4">Welcome to Virtual Vogue</h1>
        <p className="lead">
          Your personal outfit manager. Create and save outfits with ease.
        </p>
        <a href="/login" className="btn btn-primary">
          Log In
        </a>
      </div>
    </div>
  );
}

export default App;

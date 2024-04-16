import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormLabel,
  CardBody,
  Button,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const app_name = "virtvogue-af76e325d3c9";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  const doLogin = async (event) => {
    event.preventDefault();
    console.log(login, password);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";

    console.log("Valid form");

    let jsonPayload = JSON.stringify({
      login: login,
      password: password,
    });

    //API stuff here!

    try {
      const response = await fetch(buildPath("api/Login"), {
        method: "POST",
        body: jsonPayload,
        headers: { "Content-Type": "application/json" },
      });

      console.log("Fetch response");

      let res = JSON.parse(await response.text());

      if (res.userId < 0) {
        console.log("Error");
        setError("Wrong username/password");
      } else {
        console.log("Success");

        //save info
        let user = {
          userId: res.userId,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          isVerified: res.verified,
          login: login,
          password: password,
        };

        console.log(user);

        if (user.isVerified == false) {
          setError("User not verified yet. Please check your email");

          //To make things easier when testing uncomment these 2 lines. In the Heroku version, COMMENT THESE 2 LINES BELOW
          // localStorage.setItem("user_data", JSON.stringify(user));
          // window.location.href = "/home";
        } else {
          localStorage.setItem("user_data", JSON.stringify(user));
          window.location.href = "/home";
        }
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const openSignup = () => {
    window.location.href = "/signup";
  };

  const openForgotPassword = () => {
    window.location.href = "/forgotpassword";
  };

  const redirectToSignUp = () => {
    window.location.href = "/signup"; // Specify the URL you want to navigate to
  };

  return (
    <Container fluid id="loginPage">
      <Row>
        <Col id="sideBar" className="p-5 d-flex align-items-center flex-column">
          {/* <Row className="justify-content-center align-items-center mt-5">
            <h1 className="h1">New Here?</h1>
          </Row>
          <Row>
            <Button
              id="signupButton"
              variant="primary"
              type="button"
              onClick={openSignup}
            >
              Sign up
            </Button>
          </Row> */}
          <Row>
            <h1 className="h1">Forgot Password?</h1>
          </Row>
          <Row>
            <Button
              id="signupButton"
              variant="primary"
              type="button"
              onClick={openForgotPassword}
            >
              Forgot Password?
            </Button>
          </Row>
        </Col>
        <Col className="rightColumn d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={doLogin} className="signupForm">
            <h2 className="signupTitle">LOGIN</h2>

            {/* Username field */}
            <Form.Group controlId="login">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

            {/* Password field */}
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/* Error Message field*/}
            <p id="errorSignUp">{errorMessage}</p>

            <Button type="submit" className="signupButtonsPage">
              Login
            </Button>
            <hr />

            {/* Redirect to the signup page */}
            <p className="loginQuestion">New here?</p>
            <Button
              style={{ alignSelf: "center" }}
              type="button"
              className="signupButtonsPage"
              onClick={redirectToSignUp}
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

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
        setError("Wrong username/password or account doesn't exist");
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

  return (
    <Container fluid id="loginPage">
      <Row>
        <Col md={4} id="sideBar">
          <Row>
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
          </Row>
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

        <Col md={8} id="rightBar">
          <Row style={{ justifyContent: "center", alignContent: "center" }}>
            <Col md={6}>
              <Card className="loginCard">
                <CardBody>
                  <Form onSubmit={doLogin}>
                    <Row>
                      <h2 class="h2" id="loginHeader">
                        Login
                      </h2>
                    </Row>
                    <Row id="formInput">
                      <Row
                        className="formPart"
                        style={{ justifyContent: "center" }}
                      >
                        <Col md={10}>
                          <FormLabel>Username</FormLabel>
                          <FormControl
                            required
                            value={login}
                            placeholder="Username"
                            id="login"
                            type="text"
                            onChange={(e) => setLogin(e.target.value)}
                          ></FormControl>
                        </Col>
                      </Row>
                      <Row
                        className="formPart"
                        style={{ justifyContent: "center" }}
                      >
                        <Col md={10}>
                          <FormLabel>Password</FormLabel>
                          <FormControl
                            required
                            value={password}
                            placeholder="Password"
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          ></FormControl>
                        </Col>
                      </Row>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                      <p>{errorMessage}</p>
                      <Button
                        id="loginButton"
                        className="loginButton"
                        variant="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

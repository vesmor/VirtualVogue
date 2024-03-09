import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
  const [login, setLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doRegister = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password, confirmPassword);
  
    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
    
  // Email validation criteria
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.trim()) {
    console.log("FIRST NAME IS REQUIRED");
  } else if (!lastName.trim()) {
    console.log("LAST NAME IS REQUIRED");
  } else if (!emailRegex.test(email)) {
    console.log("INVALID EMAIL");
  } else if (password !== confirmPassword) {
    console.log("PASSWORDS DON'T MATCH");
  } else if (!passwordRegex.test(password)) {
    console.log("PASSWORD DOESN'T MEET CRITERIA");
  } else {
    console.log("ALL FIELDS ARE CORRECT!");


    var obj = {login:login, password:password, firstName: firstName, lastName: lastName, email: email};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch('http://localhost:5001/api/Register',{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
      var res = JSON.parse(await response.text());
      if( res.id <= 0 )
      {
        console.log('User/Password combination incorrect');
      }
      else
      {
        alert("SUCCESS!!");
        var user = {login:res.login, password:res.password, firstName:res.firstName, lastName:res.lastName, email: res.email, id:res.id}
        localStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/home';
      }
    }
    catch(e)
    {
    alert(e.toString());
    return;
    }
    
  }
  };

  return (
<Container fluid className="signupContainer">
      <Row>
        <Col md={6}>

        </Col>

        <Col md={6} className="signup-form">
          <Form onSubmit={doRegister}>

            <h2 className = "signupTitle">SIGN UP</h2>

            {/* First name field */}
            <Form.Group controlId="idFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                 type="text"
                 placeholder="First name"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            {/* Last name field */}
            <Form.Group controlId="idLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* Email field */}
            <Form.Group controlId="idEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Login ID field */}
            <Form.Group controlId="idLogin">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

            {/* Password field */}
            <Form.Group controlId="idPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/*Confirm Password field */}
            <Form.Group controlId="idConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                 type="password"
                 placeholder="Confirm password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <p className = "errorSignUp">User already Exist or bad password</p>
            <Button type="submit" id="signupButton" className="signupButtonsPage">Signup</Button>
          <hr></hr>
          </Form>
          <p>Already have an account?</p>
          <Button type="submit" id="loginButton" className="signupButtonsPage">Login</Button>

        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

            {/* <span id="inner-title">PLEASE SIGN UP</span>
            <br />
            <input
              type="text"
              id="idLogin"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="idFirstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="idLastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="idEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              id="idPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              id="idConfirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br /> */}
            
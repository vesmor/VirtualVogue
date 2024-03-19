import React, { useState } from "react";
import { TiPencil } from "react-icons/ti";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import bruhImage from "./img/bruh.jpeg";
import "./settings.css";

const Settings = () => {
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <Container fluid className="main-container">
          <Row>
            <Navbar id="myNavbar" bg="light" expand="lg" className="w-100">
            <Nav>
                  <Image src={bruhImage} roundedCircle className="large-circle" />{" "}
            </Nav>
              <Navbar.Brand href="#home" className="brand-margin">
                VIRTUAL VOGUE
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
                <Nav >
                  <Nav.Link href="/my-outfits">MY OUTFITS</Nav.Link>
                  <Nav.Link href="/create-outfit">CREATE OUTFIT</Nav.Link>
                  <Nav.Link href="/my-clothes">LOGOUT</Nav.Link>
                  <Nav.Link href="/Settings">SETTINGS</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <p className="settingsTitle">Settings</p>
          <Form className = "SettingsForm" >

            {/* First name field */}
            <Form.Group controlId="idFirstName" className="form-group">
            <Form.Label classname = "form-label"> First name</Form.Label>
            <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="icon-container">
                <TiPencil size={50} />
            </div>
            </Form.Group>

            {/* Last name field */}
            <Form.Group controlId="idLastName" className="form-group">
            <Form.Label>Last name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <div className="icon-container">
                <TiPencil size={50} />
            </div>
            </Form.Group>

            {/* Email field */}
            <Form.Group controlId="idEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="icon-container">
                <TiPencil size={50} />
            </div>
            </Form.Group>

            {/* Login ID field */}
            <Form.Group controlId="idLogin" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <div className="icon-container">
                <TiPencil size={50} />
            </div>
            </Form.Group>

            {/* Password field */}
            <Form.Group controlId="idPassword" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="icon-container">
                <TiPencil size={50} />
            </div>
            </Form.Group>

            {/* Error Message field*/}
            <p id="errorSignUp">{errorMessage}</p>
            <div className="settingButtons" >

              <Button type="submit" className="deleteButton" background size="lg">Delete Account</Button>
              <Button style= {{alignSelf: "center"}} type="button" className="saveButton" background size="lg">Save Changes</Button>
            </div>

            </Form>
          <Row>

          </Row>
        </Container>
      );
  };

export default Settings;
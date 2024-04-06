// LandingPage.js
import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Form,
  Image,
} from "react-bootstrap";
// import "./styles.css";
import "./landing.css";
import bruhImage from "./img/bruh.jpeg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./img/Logo.jpg";

const LandingPage = () => {
  return (
    <Container fluid className="landing">
      <Row>
        <Navbar
          id="myNavbar"
          bg="light"
          expand="lg"
          className="w-100 pr-3 px-3 py-2"
        >
          <Nav>
            <Image src={Logo} roundedCircle className="large-circle mx-0" />{" "}
          </Nav>
          <Navbar.Brand href="./" className="brand-margin py-0">
            VIRTUAL VOGUE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
            <Nav className="ml-auto">
              {/* <Button variant="outline-light">Login/Signup</Button> */}
              <Button
                variant="outline-light"
                as={Link}
                to="/login" // Change this to the path of your login page
                className="about-us-btn py-1"
                size="lg"
              >
                Login/Signup
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>

      <Row className="justify-content-center align-items-center mt-5">
        <Col xs={8} sm={8} md={4} lg={3} xl={3} xxl={2} className="text-center">
          <Image src={Logo} roundedCircle className="big-logo" />
        </Col>
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="text-center">
            <h1 className="virtual-vogue-text">VIRTUAL VOGUE</h1>
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="brand-sub-text">
          <h1 className="display-1 brand-sub-text">Your Virtual Wardrobe</h1>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center my-4">
        <Col className="text-center">
          <Button
            variant="outline-light"
            as={Link}
            to="/about-us"
            className="about-us-btn"
            size="lg"
          >
            Learn more about us
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;

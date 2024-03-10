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
import "./styles.css";
import "./landing.css";
import bruhImage from "./img/bruh.jpeg";

const LandingPage = () => {
  return (
    <Container fluid className="landing">
      <Row>
        <Navbar id="myNavbar" bg="light" expand="lg" className="w-100">
          <Navbar.Brand className="title">
            Virtual Vogue
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link  href="/signup">Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        </Row>
          <p className="landing-text">we virtual</p>
        <Row>

      </Row>
      
      <Row>
       <Container className="landing-card-container">
            <Card className="landing-card">
              <Image className="image-holder" src={bruhImage}></Image>
              <p>swag</p>
            </Card>
            <Card className="landing-card">
              <Image className="image-holder" src={bruhImage}></Image>
              <p>more swag</p>
            </Card>
            <Card className="landing-card">
              <Image className="image-holder" src={bruhImage}></Image>
              <p>more more swag</p>
            </Card>
            
        </Container>
      </Row>

        <a className="landing-text" href="/aboutus">Learn more about us</a>


    </Container>
  );
};

export default LandingPage;

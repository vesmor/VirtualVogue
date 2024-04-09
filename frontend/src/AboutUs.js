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
import "./AboutUs.css";
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

      <Row className="justify-content-center align-items-center">
        <Col className="brand-sub-text">
          <h1 className="display-1 brand-sub-text">Meet the Designers</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="m-0">more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={3} className="d-flex justify-content-center p-2">
          <Card className="landing-card">
            <Row>
              <Col>
                <Image className="image-holder" src={bruhImage}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>more more swag</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;

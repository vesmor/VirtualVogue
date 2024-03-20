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
import Settings from "./Settings"
import bruhImage from "./img/bruh.jpeg";

const Home = () => {
  return (
    <Container fluid className="main-container">
      <Row>
        <Navbar id="myNavbar" bg="light" expand="lg" className="w-100">
          <Navbar.Brand href="#home" className="brand-margin">
            Virtual Vogue
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
            <Nav>
              <Nav.Link href="/my-outfits">My Outfits</Nav.Link>
              <Nav.Link href="/create-outfit">Create Outfit</Nav.Link>
              <Nav.Link href="/my-clothes">My Clothes</Nav.Link>
              <Nav.Link href="/Settings">Settings</Nav.Link>
            </Nav>
            <Nav>
              <Image src={bruhImage} roundedCircle className="large-circle" />{" "}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row className="flex-grow justify-content-between py-3">
        <Col xs={4}>
          <Form.Control type="search" placeholder="Search" />
        </Col>
        <Col xs={8} className="d-flex justify-content-end">
          <p>My Outfits</p>
        </Col>
      </Row>
      <Row className="flex-grow h-100 overflow-auto">
        <Container className="card-container">
          {[...Array(20)].map((_, i) => (
            <Card key={i} className="card">
              <Card.Body>
                bruh said bruh when burhing on bruh on jahseh onfroid
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Row>
    </Container>
  );
};

export default Home;

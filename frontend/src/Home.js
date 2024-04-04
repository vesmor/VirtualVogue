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
import Settings from "./Settings";
import bruhImage from "./img/bruh.jpeg";
import Logo from "./img/Logo.jpg";
import { FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const deleteImage = () => {
    window.confirm("Are you sure you want to delete this clothing?");
  };
  return (
    <Container fluid className="main-container">
      <Row>
        <Navbar id="myNavbar" bg="light" expand="lg" className="w-100">
          <Nav>
            <Image src={Logo} roundedCircle className="large-circle" />{" "}
          </Nav>
          <Navbar.Brand href="#home" className="brand-margin">
            VIRTUAL VOGUE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-nav">
            <Nav>
              <Nav.Link href="/my-outfits">MY OUTFITS</Nav.Link>
              <Nav.Link href="/create-outfit">CREATE OUTFIT</Nav.Link>
              <Nav.Link href="/my-clothes">MY CLOTHING</Nav.Link>
              <Nav.Link href="/Settings">SETTINGS</Nav.Link>
              <Nav.Link href="/">LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row className="flex-grow justify-content-between py-3">
        <Col xs={4}>
          <Form.Control
            className="homeSearchBar"
            type="search"
            placeholder="Search"
          />
        </Col>
        <Col xs={8} className="d-flex justify-content-end">
          <p className="myOutfit">My Outfits</p>
        </Col>
      </Row>
      <Row className="flex-grow h-100 overflow-auto">
        <Container className="card-container p-3">
          {[...Array(20)].map((_, i) => (
            <Card key={i} className="card">
              <Card.Body>
                <div className="icon-wrapper" onClick={deleteImage}>
                  <FaTrashAlt />
                </div>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Row>
    </Container>
  );
};

export default Home;

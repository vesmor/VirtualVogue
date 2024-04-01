import React, { useState, useEffect } from "react";
import { IoIosShirt } from "react-icons/io";
import { GiAmpleDress, GiArmoredPants } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import "./MyClothing.css";
import Logo from "./img/Logo.jpg";

const MyClothing = () => {
  const [clothingText, setClothingText] = useState("My Clothing");
  const [shirtIconColor, setShirtIconColor] = useState(false);
  const [dressIconColor, setDressColor] = useState(false);
  const [pantsIconColor, setPantsColor] = useState(false);

  //Used to hide and show the Modal (Form)
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteImage = () => {
    window.confirm("Are you sure you want to delete this clothing?");
  };

  //Change the header text and the color of the icon selected. This function should also then only show the images of the type selected
  const selectClothIcon = (iconNumber) => {
    var shirtCheck = shirtIconColor;
    var dressCheck = dressIconColor;
    var pantsCheck = pantsIconColor;
    if (iconNumber == 1) {
      shirtCheck = !shirtIconColor;
      setShirtIconColor(shirtCheck);
    } else if (iconNumber == 2) {
      dressCheck = !dressIconColor;
      setDressColor(dressCheck);
    } else {
      pantsCheck = !pantsIconColor;
      setPantsColor(pantsCheck);
    }

    if (shirtCheck && dressCheck && pantsCheck) {
      setClothingText("My Clothing");
      setShirtIconColor(false);
      setDressColor(false);
      setPantsColor(false);
    } else if (shirtCheck && dressCheck) {
      setClothingText("My Shirts & Dresses");
    } else if (shirtCheck && pantsCheck) {
      setClothingText("My Shirts & Pants");
    } else if (dressCheck && pantsCheck) {
      setClothingText("My Dresses & Pants");
    } else if (shirtCheck) {
      setClothingText("My Shirts");
    } else if (pantsCheck) {
      setClothingText("My Pants");
    } else if (dressCheck) {
      setClothingText("My Dresses");
    } else {
      setClothingText("My Clothing");
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Cloth</Modal.Title>
        </Modal.Header>
        <Modal.Body>Info that will be sent to API here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
                <Nav.Link href="/Home">MY OUTFITS</Nav.Link>
                <Nav.Link href="/create-outfit">CREATE OUTFIT</Nav.Link>
                <Nav.Link href="/my-clothes">MY CLOTHING</Nav.Link>
                <Nav.Link href="/Settings">SETTINGS</Nav.Link>
                <Nav.Link href="/">LOGOUT</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row className="fullView">
          <Col xs={12} sm={6} md={4} lg={3} className="LeftBar">
            <Row className="d-flex flex-column">
              {" "}
              {/* Set flex-direction to column */}
              <p className="clothItem">CLOTHING ITEM</p>
              <Card
                className="IconCards"
                style={{
                  backgroundColor: shirtIconColor ? "#71816D" : "white",
                }}
              >
                <Card.Body
                  className="d-flex justify-content-center align-items-center"
                  onClick={() => selectClothIcon(1)}
                >
                  <IoIosShirt className="cloth-icon" />
                </Card.Body>
              </Card>
              <Card
                className="IconCards"
                style={{
                  backgroundColor: dressIconColor ? "#71816D" : "white",
                }}
              >
                <Card.Body
                  className="d-flex justify-content-center align-items-center"
                  onClick={() => selectClothIcon(2)}
                >
                  <GiAmpleDress className="cloth-icon" />
                </Card.Body>
              </Card>
              <Card
                className="IconCards"
                style={{
                  backgroundColor: pantsIconColor ? "#71816D" : "white",
                }}
              >
                <Card.Body
                  className="d-flex justify-content-center align-items-center"
                  onClick={() => selectClothIcon(3)}
                >
                  <GiArmoredPants className="cloth-icon" />
                </Card.Body>
              </Card>
              <Button
                type="button"
                className="uploadButton"
                background
                size="lg"
                onClick={handleShow}
              >
                New Cloth
              </Button>
            </Row>
          </Col>
          <Col xs={12} sm={6} md={8} lg={9} className="RightBar">
            <Row className="flex-grow justify-content-between p-0">
              <Col xs={4}>
                <Form.Control
                  className="homeSearchBar"
                  type="search"
                  placeholder="Search"
                />
              </Col>
              <Col xs={8} className="d-flex justify-content-end">
                <p className="myClothing">{clothingText}</p>
              </Col>
            </Row>
            <Container className="card-container flex: 1 overflow-y-auto pb-3">
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyClothing;

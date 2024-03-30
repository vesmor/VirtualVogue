import React, { useState, useEffect } from "react";
import {IoIosShirt} from "react-icons/io";
import{GiArmoredPants} from "react-icons/gi";
import {FaCheck} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
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
import "./CreateOutfit.css";
import Logo from "./img/Logo.jpg";

const CreateOutfit = () => {

    const [shirtIconColor, setShirtIconColor] = useState(false);
    const [pantsIconColor, setPantsColor] = useState(false);

    const [showCheckIcon, setShowCheckIcon] = useState([...Array(100)].map(() => false));
    const [counter, setCounter] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imageSelected = (index) => {
        var counts = counter;
        var arr = [...showCheckIcon]; 
        arr[index] = !arr[index];
        if(arr[index] == true){
            counts++;
        } 
        else{
            counts--;
        }
        setCounter(counts);
        if(counts == 2){
            setIsButtonDisabled(false);
        } 
        else{
            setIsButtonDisabled(true);
        } 
        setShowCheckIcon(arr);
    }

    const selectClothIcon = (iconNumber) => {
      var shirtCheck =shirtIconColor;
      var pantsCheck = pantsIconColor;
      if(iconNumber == 1){
        shirtCheck = !shirtIconColor;
        setShirtIconColor(shirtCheck);
        
      }
      else{
        pantsCheck= !pantsIconColor;
        setPantsColor(pantsCheck);
      }

      if(shirtCheck && pantsCheck){
        setPantsColor(false);
        setShirtIconColor(false);
      }
    }

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
                <Nav >
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
        <Col md={2} className="LeftBar">
            <Row className="d-flex flex-column"> {/* Set flex-direction to column */}
                <p className="clothItem">CLOTHING ITEM</p>
                <Card className="IconCards" style={{backgroundColor: shirtIconColor ? "#71816D" : "white" }}>
                    <Card.Body className="d-flex justify-content-center align-items-center" onClick={() =>selectClothIcon(1)}>
                        <IoIosShirt className="cloth-icon" />
                    </Card.Body>
                </Card>
                <Card className="IconCards" style={{backgroundColor: pantsIconColor ? "#71816D" : "white" }}>
                    <Card.Body className="d-flex justify-content-center align-items-center" onClick={() =>selectClothIcon(2)}>
                        <GiArmoredPants className="cloth-icon" />
                    </Card.Body>
                </Card>

                <Button type="button" className="newOutfitButton" background size="lg" onClick={handleShow} disabled={isButtonDisabled}>New Outfit</Button>
            </Row>
        </Col>
        <Col  md={10} className= "RightBar">
            <Row>
                <Col xs={4}>
                  <Form.Control className = "homeSearchBar" type="search" placeholder="Search" />
                </Col>
                <Col xs={8} className="d-flex justify-content-end">
                <p className = "myOutfit">Create Outfit</p>
                </Col>
            </Row>
            <Row className="imagesDisplay">
                <Container className="card-container">
                    {[...Array(20)].map((_, i) => (
                    <Card key={i} className="card" onClick={() => imageSelected(i)}>
                        <Card.Body>
                        <div className="check-icon" style={{ display: showCheckIcon[i] ? "block" : "none" }} >
                            <FaCheck />
                        </div>
                        </Card.Body>
                    </Card>
                    ))}
                </Container>
            </Row>
        </Col>
        </Row>
    </Container>
    </>
    
  );
};

export default CreateOutfit;

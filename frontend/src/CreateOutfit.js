import React, { useState, useEffect } from "react";
import { IoIosShirt } from "react-icons/io";
import { GiAmpleDress, GiArmoredPants } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
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
import "./CreateOutfit.css";
import Logo from "./img/Logo.jpg";

const CreateOutfit = () => {
  const [clothingText, setClothingText] = useState("My Outfits");
  const [shirtIconColor, setShirtIconColor] = useState(false);
  const [pantsIconColor, setPantsColor] = useState(false);

  const [showCheckIcon, setShowCheckIcon] = useState(
    [...Array(100)].map(() => false)
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [outfitName, setOutfitName] = useState("");
  const [loading, setLoading] = useState(false);

  const [numPictures, setNumPictures] = useState(0); 
  const [imagesURL, setImagesURL] = useState(null);
  const [selectedPants , setSelectedPants] = useState(null);
  const [selectedShirt , setSelectedShirt] = useState(null);
  const [imagesTag , setImagesTag] = useState(null);
  const [doFirstFetch, setDoFirstFech] = useState(true);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setMessage('');
    setOutfitName("");
  };

  const imageSelected = (index,tag,image) => {
    var arr = [...showCheckIcon];
    arr[index] = !arr[index];
    if (arr[index] == true) {
      if(tag === 'Shirt'){
        if(selectedShirt) return;
        setSelectedShirt(image);
        if(selectedPants){
          setIsButtonDisabled(false);
        }
        else{
          setIsButtonDisabled(true);
        }
      }
      else if(tag === 'Pants'){
        if(selectedPants) return;
        setSelectedPants(image);
        if(selectedShirt){
          setIsButtonDisabled(false);
        }
        else{
          setIsButtonDisabled(true);
        }
      }
    } else {
        if(tag === 'Shirt'){
        setSelectedShirt(null);
      }
      else if (tag === 'Pants'){
        setSelectedPants(null);
      }
      setIsButtonDisabled(true);
    }
    setShowCheckIcon(arr);
  };

  const selectClothIcon = (iconNumber) => {
    var shirtCheck = shirtIconColor;
    var pantsCheck = pantsIconColor;
    if (iconNumber == 1) {
      shirtCheck = !shirtIconColor;
      setShirtIconColor(shirtCheck);
    } else {
      pantsCheck = !pantsIconColor;
      setPantsColor(pantsCheck);
    }

    if (shirtCheck && pantsCheck) {
      setPantsColor(false);
      setShirtIconColor(false);
      setClothingText("My outfits");
      fetchTagData("Shirt,Pants");
    }
    else if(shirtCheck){
      setClothingText("My shirts");
      fetchTagData("Shirt");
    }
    else if (pantsCheck){
      setClothingText("My pants");
      fetchTagData("Pants");
      
    }
    else{
      setClothingText("My outfits");
      fetchTagData("Shirt,Pants");
    }
  };

  const UploadImage = async (event) => {
    event.preventDefault();
    if(!outfitName || outfitName.length > 14){
      setMessage("Outfits must have a unique name. The maximum length is 14 characters long");
      return;
    }
    const userData = localStorage.getItem('user_data');
    var parsedUserData;
    setLoading(true);
    if (userData) {
      parsedUserData = JSON.parse(userData);
    }
  
    let jsonPayload = JSON.stringify({
      shirtURL: selectedShirt,
      shirtTag: 'Shirt',
      pantsURL: selectedPants,
      pantsTag: 'Pants',
      outfitName: outfitName
  }
  );

  //API stuff here!

  try {
      const response = await fetch(buildPath(`api/Outfits/${parsedUserData.userId}`), {
          method: 'POST',
          body: jsonPayload,
          headers: { 'Content-Type': 'application/json' }
      });

      console.log("Fetch response");

      let res = JSON.parse(await response.text());

      if (!res.success) {
          console.log('Error');
          setMessage(res.message);
      }
      else {
          setMessage("Outfit saved, check out the outfits page!");
      }
  }
  catch (e) {
      alert(e.toString());
      return;
  }
    
  };

  const fetchTagData = async (tag) => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const response = await fetch(buildPath(`api/images/${parsedUserData.userId}/${tag}`), {
          method: 'GET'
        });
    
        let res = await response.json();
        if(res.success){
          
          setNumPictures(res.images.length);
          setImagesURL(prevImagesURL => {
            const newImagesURL = []; // Create a new array
            for (var i = 0; i < res.images.length; i++) {
              newImagesURL.push(res.images[i].url); // Append values to the new array
            }
            return newImagesURL;
          });

          setImagesTag(prevImagesTag => {
            const newImagesTag = []; 
            for (var i = 0; i < res.images.length; i++) {
              newImagesTag.push(res.images[i].tag); 
            }
            return newImagesTag;
          });
        }
        else{
          setNumPictures(0);
          console.error('No links were given');
        }
      } else {
        alert("User not found");
        console.error('User data not found in localStorage.');
      }
    } catch (error) {
      alert("An error occurred");
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    var firstTime = doFirstFetch;
    if(firstTime){
      setDoFirstFech(false);
      fetchTagData("Shirt,Pants");
    } else {
      // Logic that depends on imagesURL
      if(selectedShirt || selectedPants){
        var arr = ([...Array(100)].map(() => false));
        for(var i = 0 ; i < imagesURL.length; i++){
          if(imagesURL[i] === selectedShirt){
            arr[i] = true;
          }
          if(imagesURL[i] === selectedPants ){
            arr[i] = true;
          }
        }
        setShowCheckIcon(arr);
      }
    }
  }, [imagesURL]);
  
  const app_name = 'virtvogue-af76e325d3c9';
  function buildPath(route)
  {
      if(process.env.NODE_ENV === 'production')
      {
          return 'https://' + app_name + '.herokuapp.com/' + route;
      }
      else
      {
          return 'http://localhost:5001/' + route;
      }
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Outfit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Image src={selectedShirt}/>{" "}
        <Image src={selectedPants}/>{" "}
          {message}
        <p>Give a name to this outfit!</p>
        <Form.Group controlId="idFirstName">
              <Form.Label classname = "form-label"> Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Outfit Name"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UploadImage}>
            Save
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
                disabled={isButtonDisabled}
              >
                New Outfit
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
              {[...Array(numPictures)].map((_, i) => (
              <Card key={i} className="cardImages" onClick={() => imageSelected(i, imagesTag[i], imagesURL[i])}>
                <Card.Body style={{ position: 'relative'}}>
              
                <div className="check-icon" style={{ display: showCheckIcon[i] ? "block" : "none" }} >
                            <FaCheck />
                  </div>
                  <img 
                    src={imagesURL[i]}
                    alt="Selected"
                    className="card-image"
                  />

                  <h1 className= "imageTagText">{imagesTag[i]}</h1>
      
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

export default CreateOutfit;

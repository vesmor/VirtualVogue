import React, { useState, useEffect } from "react";
import { IoIosShirt } from "react-icons/io";
import { GiAmpleDress, GiArmoredPants } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import imglyRemoveBackground from "@imgly/background-removal";
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
  Dropdown,
} from "react-bootstrap";
import "./MyClothing.css";
import Logo from "./img/Logo.jpg";

const MyClothing = () => {
  //Used to know which clothing type image should display
  const [clothingText, setClothingText] = useState("My Clothing");
  const [shirtIconColor, setShirtIconColor] = useState(false);
  const [dressIconColor, setDressColor] = useState(false);
  const [pantsIconColor, setPantsColor] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);


  const [arrayEmpty, setArrayEmpty] = useState(false);

  //Used to hide and show the Modal (Form) info
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [messageColorRed, setMessageColorRed] = useState(false);

  //Count number of pictures to be displayed so far
  const [numPictures, setNumPictures] = useState(0);
  const [imagesURL, setImagesURL] = useState(null);
  const [imagesTag, setImagesTag] = useState(null);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [doFirstFetch, setDoFirstFech] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setSelectedTag("");
    setRemoveBackground(false);
    setMessage("");
    setMessageColorRed(false);
  };
  const handleShow = () => setShowModal(true);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  };

  const handleRemoveBackgroundChange = (option) => {
    setRemoveBackground(option);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      // Get the file's MIME type
      const fileType = file.type;

      // Check if the file's MIME type starts with 'image/'
      if (fileType && fileType.startsWith("image/")) {
        setSelectedImage(file);
      } else {
        // If the file is not an image, alert the user and clear the selection
        e.target.value = null;
        setSelectedImage(null);
      }
    }
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
      fetchAllData();
      setShirtIconColor(false);
      setDressColor(false);
      setPantsColor(false);
    } else if (shirtCheck && dressCheck) {
      setClothingText("My Shirts & Dresses");
      fetchTagData("Shirt,Dress");
    } else if (shirtCheck && pantsCheck) {
      setClothingText("My Shirts & Pants");
      fetchTagData("Shirt,Pants");
    } else if (dressCheck && pantsCheck) {
      setClothingText("My Dresses & Pants");
      fetchTagData("Dress,Pants");
    } else if (shirtCheck) {
      setClothingText("My Shirts");
      fetchTagData("Shirt");
    } else if (pantsCheck) {
      setClothingText("My Pants");
      fetchTagData("Pants");
    } else if (dressCheck) {
      setClothingText("My Dresses");
      fetchTagData("Dress");
    } else {
      setClothingText("My Clothing");
      fetchAllData();
    }
  };

  const UploadImage = async (event) => {
    event.preventDefault();
    if (!selectedTag) {
      setMessageColorRed(true);
      setMessage("Please select a clothing type");
      return;
    }
    const userData = localStorage.getItem("user_data");
    var parsedUserData;
    setLoading(true);
    if (userData) {
      parsedUserData = JSON.parse(userData);
    }

    var formData = new FormData();
    formData.append("tag", selectedTag);
    if (removeBackground) {
      setMessageColorRed(false);
      setMessage("Removing background, this might take a minute...");
      const processedImage = await imglyRemoveBackground(selectedImage);
      setSelectedImage(processedImage);
      formData.append("image", processedImage);
    } else {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(
        buildPath(`api/Upload/${parsedUserData.userId}`),
        {
          method: "POST",
          body: formData,
        }
      );

      let res = await response.json();

      if (res.success) {
        setMessageColorRed(false);
        setMessage(res.message);
        fetchAllData();
      } else {
        setMessageColorRed(true);
        setMessage(res.message);
      }
      setLoading(false);
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const deleteImage = async (event, url) => {
    event.preventDefault();

    const acceptDelete = window.confirm(
      "Are you sure you want to delete this clothing?"
    );

    // Proceed to delete image
    if (acceptDelete) {
      const userData = localStorage.getItem("user_data");

      // Get the userId
      var parsedUserData;
      if (userData) {
        parsedUserData = JSON.parse(userData);
      }

      // Get the image public ID from the link
      const parts = url.split("/");
      const idWithExtension = parts[parts.length - 1];
      const id = idWithExtension.slice(0, -4);

      // Construct the request body as JSON
      const bodyData = {
        id: id,
      };

      try {
        const response = await fetch(
          buildPath(`api/DeletePhoto/${parsedUserData.userId}`),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(bodyData), // Convert the body data object to JSON string
          }
        );

        let res = await response.json();

        if (res.success) {
          fetchAllData();
        } else {
          alert("failed");
        }
      } catch (e) {
        alert(e.toString());
        return;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    var firstTime = doFirstFetch;
    if (firstTime) {
      setDoFirstFech(false);
      fetchAllData();
    }
  }, []);

  //Calls the fetch images API
  const fetchAllData = async () => {
    try {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const response = await fetch(
          buildPath(`api/images/${parsedUserData.userId}`),
          {
            method: "GET",
          }
        );

        let res = await response.json();
        if (res.success) {
          setNumPictures(res.images.length);
          // Use functional update to append to imagesURL
          setImagesURL((prevImagesURL) => {
            const newImagesURL = [];
            for (var i = 0; i < res.images.length; i++) {
              newImagesURL.push(res.images[i].url);
            }
            return newImagesURL;
          });

          setImagesTag((prevImagesTag) => {
            const newImagesTag = [];
            for (var i = 0; i < res.images.length; i++) {
              newImagesTag.push(res.images[i].tag);
            }
            return newImagesTag;
          });
          setArrayEmpty(false);
        } else {
          setArrayEmpty(true);
          setNumPictures(0);
          console.error("No links given.");
        }
      } else {
        alert("User not found");
        console.error("User data not found in localStorage.");
      }
    } catch (error) {
      alert("An error occurred");
      console.error("Error fetching data:", error);
    }
  };

  const fetchTagData = async (tag) => {
    try {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const response = await fetch(
          buildPath(`api/images/${parsedUserData.userId}/${tag}`),
          {
            method: "GET",
          }
        );

        let res = await response.json();
        if (res.success) {
          setNumPictures(res.images.length);
          setImagesURL((prevImagesURL) => {
            const newImagesURL = []; // Create a new array
            for (var i = 0; i < res.images.length; i++) {
              newImagesURL.push(res.images[i].url); // Append values to the new array
            }
            return newImagesURL;
          });

          setImagesTag((prevImagesTag) => {
            const newImagesTag = [];
            for (var i = 0; i < res.images.length; i++) {
              newImagesTag.push(res.images[i].tag);
            }
            return newImagesTag;
          });
          setArrayEmpty(false);
        } else {
          setArrayEmpty(true);
          setNumPictures(0);
          console.error("No links were given");
        }
      } else {
        alert("User not found");
        console.error("User data not found in localStorage.");
      }
    } catch (error) {
      alert("An error occurred");
      console.error("Error fetching data:", error);
    }
  };

  const app_name = "virtvogue-af76e325d3c9";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton={!loading}>
          <Modal.Title style={{ fontFamily: "Lemands" }}>Upload New Clothing Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <p style={{ fontFamily: "Roboto" }}>Upload an image: </p>
            {selectedImage && (
              <img
                className="mb-4"
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  display: "block",
                  margin: "auto",
                  marginTop: "10px",
                }}
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            ></input>
          </Row>
          <Row className="align-items-center mt-3">
            <Col md={8}>
            <p className="mb-0 mr-2" style={{ fontFamily: "Roboto" }}>What kind of clothing is it?</p>
            </Col>
            <Col md={4}>
            <Dropdown className="mt-2">
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#342a21' }}>
                {selectedTag ? selectedTag : "Clothing type"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleTagChange("Shirt")}>
                  Shirt
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagChange("Pants")}>
                  Pants
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagChange("Dress")}>
                  Dress
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            </Col>

          </Row>
          <Row className="mb-0 mr-2 mt-3">
          <Col md={8}>
            <div style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "Roboto", position: 'relative' }}>
              <p className="mb-0 mr-2 mt-2">
                Remove image's background?
              </p>
              <div
                style={{ position: 'absolute', top: '100%', left: '100%', transform: 'translateY(-110%)', display: showTooltip ? 'block' : 'none', backgroundColor: 'white', padding: '5px', border: '1px solid black', borderRadius: '5px', zIndex: 999 }}
              >
                This is recommended if you want to use it in an outift. However, it might take a minute or two to process the image.
              </div>
              <FaQuestionCircle
                style={{ marginLeft: '5px', marginTop: '5px', color: '#71816d', cursor: 'pointer' }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
            </div>
          </Col>
            <Col md={4}>
            <Dropdown className="mt-2">
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#342a21'  }}>
                {removeBackground ? "Yes" : "No"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleRemoveBackgroundChange(true)}
                >
                  Yes
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleRemoveBackgroundChange(false)}
                >
                  No
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Col>
          </Row>

          <Row>
            <p style={{ color: messageColorRed ? 'red' : 'black'}}>{message}</p>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={UploadImage} disabled={loading} style={{ backgroundColor: '#71816d' }}>
            {loading ? "Uploading..." : "Upload Clothing"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid className="main-container">
        <Row>
          <Navbar id="myNavbar" bg="light" expand="lg" className="w-100">
            <Nav>
              <Image src={Logo} roundedCircle className="large-circle" />{" "}
            </Nav>
            <Navbar.Brand href="./" className="brand-margin py-0">
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
                New Item
              </Button>
            </Row>
          </Col>
          <Col xs={12} sm={6} md={8} lg={9} className="RightBar">
            <Row className="flex-grow justify-content-between p-0">
              <Col xs={4}></Col>
              <Col xs={8} className="d-flex justify-content-end">
                <p className="myClothing">{clothingText}</p>
              </Col>
            </Row>
            <p className="emptyMesage" style={{ display: arrayEmpty ? "block" : "none" }}>
              Click on New Item button to add your first clothing!
            </p>
            <Container className="card-container flex: 1 overflow-y-auto pb-3">
              {[...Array(numPictures)].map((_, i) => (
                <Card
                  key={i}
                  className="cardImages"
                  style={{ maxHeight: "300px" }}
                >
                  <Card.Body style={{ position: "relative" }}>
                    <Row>
                      <Col>
                      <a href={imagesURL[i]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div
                          className="icon-wrapper"
                          onClick={(event) => deleteImage(event, imagesURL[i])}
                        >
                          <FaTrashAlt style={{ color: "black" }} />
                        </div>
                        <img
                          src={imagesURL[i]}
                          alt="Selected"
                          className="card-image"
                        />
                       </a>

                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h1 className="imageTagText">{imagesTag[i]}</h1>
                      </Col>
                    </Row>
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

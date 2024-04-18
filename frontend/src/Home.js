import React, { useState, useEffect } from "react";
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
import Logo from "./img/Logo.jpg";
import { FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const [numPictures, setNumPictures] = useState(0);
  const [outfits, setOutfits] = useState(null);
  const [doFirstFetch, setDoFirstFech] = useState(true);
  const [arrayEmpty, setArrayEmpty] = useState(false);

  const app_name = "virtvogue-af76e325d3c9";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  const fetchOutfits = async () => {
    try {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const response = await fetch(
          buildPath(`api/Outfits/${parsedUserData.userId}`),
          {
            method: "GET",
          }
        );

        let res = await response.json();
        if (res.success) {
          setNumPictures(res.outfits.length);
          setOutfits((prevImagesURL) => {
            const newImagesURL = []; // Create a new array
            for (var i = 0; i < res.outfits.length; i++) {
              newImagesURL.push(res.outfits[i]); // Append values to the new array
            }
            return newImagesURL;
          });
          setArrayEmpty(false);
        } else {
          setNumPictures(0);
          setArrayEmpty(true);
          console.error("No links were given");
        }
      } else {
        console.log("User not found");
        console.error("User data not found in localStorage.");
      }
    } catch (error) {
      console.log("An error occurred");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    var firstTime = doFirstFetch;
    if (firstTime) {
      setDoFirstFech(false);
      fetchOutfits();
    }
  }, []);

  const deleteOutfit = async (event, name) => {
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
      const bodyData = {
        outfitName: name,
      };
      try {
        const response = await fetch(
          buildPath(`api/Outfits/${parsedUserData.userId}/${name}`),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(bodyData), // Convert the body data object to JSON string
          }
        );

        let res = await response.json();

        if (res.success) {
          fetchOutfits();
        } else {
          console.log("failed");
        }
      } catch (e) {
        console.log(e.toString());
        return;
      }
    } else {
      return;
    }
  };

  const searchOutfit = async (value) => {
    if (!value) {
      fetchOutfits();
    }
    else{
      if(arrayEmpty) return;
        try {
        const userData = localStorage.getItem("user_data");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const response = await fetch(
            buildPath(`api/SearchOutfits/${parsedUserData.userId}/${value}`),
            {
              method: "GET",
            }
          );

          let res = await response.json();
          if (!res.error || res.searchResults.length > 0) {
            setNumPictures(res.searchResults.length);
            setOutfits((prevImagesURL) => {
              const newImagesURL = []; // Create a new array
              for (var i = 0; i < res.searchResults.length; i++) {
                newImagesURL.push(res.searchResults[i]); // Append values to the new array
              }
              return newImagesURL;
            });
            setArrayEmpty(false);
          } else {
            setNumPictures(0);
            console.error("No links were given");
          }
        } else {
          console.error("User data not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
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
      <Row style={{ height: "10%" }}>
        <Col xs={4}>
          <Form.Control
            className="homeSearchBar"
            type="search"
            placeholder="Search"
            onChange={(e) => searchOutfit(e.target.value)}
          />
        </Col>
        <Col xs={8} className="d-flex justify-content-end align-items-center">
          <p className="myOutfit">My Outfits</p>
        </Col>
      </Row>
      <Row style={{ height: "80%", overflow: "auto" }}>
        <p
          className="emptyMessageOutfit"
          style={{ display: arrayEmpty ? "block" : "none" }}
        >
          You don't have any outfits yet! <br></br> Go to create outfit tab to
          create one!
        </p>
        <Container className="card-container p-3">
          {[...Array(numPictures)].map((_, i) => (
            <Card key={i} className="cardOutfit p-0">
              <Row className="outfitTitle">
                <Col>
                  <h1 className="pt-2">{outfits[i].outfitName}</h1>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div
                    className="icon-wrapper"
                    onClick={(event) =>
                      deleteOutfit(event, outfits[i].outfitName)
                    }
                  >
                    <FaTrashAlt style={{ color: "black" }} />
                  </div>
                  <Image
                    src={outfits[i].shirtURL}
                    alt="Selected"
                    className="card-imageHome"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Image
                    src={outfits[i].pantsURL}
                    alt="Selected"
                    className="card-imageHome"
                  />
                </Col>
              </Row>
              {/* <Row className="outfitTag">
                <Col>
                  <h1>{"Outfit"}</h1>
                </Col>
              </Row> */}
            </Card>
          ))}
        </Container>
      </Row>
    </Container>
  );
};

export default Home;

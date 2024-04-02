import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FormLabel,
    CardBody,
    Button,
    FormControl,
} from "react-bootstrap";
import './forgotPassword.css';
const ForgotPassword= () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    const openSignup = () => {
        window.location.href = '/signup'
    }

    const openLogin = () => {
        window.location.href = '/login'
    }

    const sendEmail=async (event)=>{
    event.preventDefault();
    var obj = {email: email};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch(buildPath('api/findUser'),{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
      var res = JSON.parse(await response.text());
      if( !res.found )
      {
        setErrorMessage('User was not found');
      }
      else
      {
        setErrorMessage('User was found. An email will be sent!');
      }
    }
    catch(e)
    {
    alert(e.toString());
    return;
    }
    }

    return(
            <Container fluid id="forgotPasswordPage">
                <Row>
                    <Col md={4} id="sideBar">
                        <Row>
                            <h1 className="h1-left">New Here?</h1>
                        </Row>
                        <Row>
                            <Button id="signupButton" variant="primary" type="button" onClick={openSignup}>Sign up</Button>
                        </Row>
                        <Row>
                        <h1 className="h1-left">Already have an account?</h1>
                        </Row>
                        <Row>
                            <Button id="signupButton" variant="primary" type="button" onClick={openLogin}>Login</Button>
                        </Row>
                    </Col>
    
                    <Col md={8} id="rightBar">
                        <Row className= "rowForgotPassword">
                            <Col md={6} >
                                <Card className="forgotPasswordCard">
                                    <CardBody>
                                        <Form>
                                            <Row>
                                                <h2 class="h2" id="forgotPasswordHeader" >Forgot Password?</h2>
                                            </Row>

                                            <Row id = "formInput">
                                            
                                                <Row className = "formPart" style = {{justifyContent: "center"}}>
                                                    <Col md = {10}>
                                                        <p className="instructions">Reset password Instructions:</p>
                                                        <p className="instructions"style={{ marginLeft: '20%' }}>1. Enter your email</p>
                                                        <p className="instructions"style={{ marginLeft: '20%' }}>2. An email will be sent with a link to click on</p>
                                                        <p className="instructions"style={{ marginLeft: '20%' }}>3. Enter new password in the next page</p>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl required value={email} placeholder="Username" id="login" type="text" onChange={(e) => setEmail(e.target.value)}></FormControl>
                                                    </Col>
                                                </Row>
                                            </Row>
                                            <Row style={{ justifyContent: "center" }}>
                                                <p>{errorMessage}</p>
                                                <Button id="sendEmailButton" className = "sendEmailButton" variant="primary" type="submit" onClick={sendEmail}>Send</Button>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
    
            </Container>
    );

}
export default ForgotPassword;
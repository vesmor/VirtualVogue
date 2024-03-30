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

    const openSignup = () => {
        window.location.href = '/signup'
    }

    const openLogin = () => {
        window.location.href = '/login'
    }

    const sendEmail=()=>{
        setErrorMessage("No user exist with this email");
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
                                                        <p className="instructions"style={{ marginLeft: '20%' }}>2. An email will be sent with a confirmation code</p>
                                                        <p className="instructions"style={{ marginLeft: '20%' }}>3. Enter code in the next page</p>
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
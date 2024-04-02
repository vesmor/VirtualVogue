import React, { useState } from "react";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfirmPassword] = useState("");
    const [errorMessage, setError] = useState("");

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

    const openLogin = () => {
        window.location.href = '/login'
    }

    const doReset = async (event) => {
        event.preventDefault();

        // Password validation criteria
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
        if(password != confrimPassword){
            setError("Passwords don't match");
        }
        else if (!passwordRegex.test(password)) {
            setError("Password must be 8 characters long, one upper and lower case letter, a number, and a special symbol");
        }
        else{
            var url = window.location.href;
            var urlParams = new URLSearchParams(window.location.search);
            var paramValue =urlParams.get("userId");
            console.log(paramValue);

            let jsonPayload = JSON.stringify({
                userId: paramValue,
                newPassword: password
            }
            );
    
            try {
                const response = await fetch(buildPath('api/UpdatePass'), {
                    method: 'POST',
                    body: jsonPayload,
                    headers: { 'Content-Type': 'application/json' }
                });
    
                let res = JSON.parse(await response.text());
    
                if (res.error) {
                    console.log('Error');
                    setError("There was a problem when changing passwords");
                }
                else {                
    
                    setError("Password Updated successfully, you may close this window");
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        }


        
    }

    return (
        <Container fluid id="loginPage">
        <Row>
            <Col md={4} id="sideBar">
                <Row>
                    <h1 className="h1">Changed your mind?</h1>
                </Row>
                <Row>
                    <Button id="signupButton" variant="primary" type="button" onClick={openLogin}>Login</Button>
                </Row>
            </Col>

            <Col md={8} id="rightBar">

                <Row style={{ justifyContent: "center", alignContent: "center" }}>
                    <Col md={6}>
                        <Card className="loginCard">
                            <CardBody>
                                <Form onSubmit={doReset}>
                                    <Row>
                                        <h2 class="h2" id="loginHeader" >Password Reset</h2>
                                    </Row>
                                    <Row id = "formInput">
                                        <Row className = "formPart" style={{ justifyContent: "center" }}>
                                            <Col md = {10}>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl required value={password} placeholder="New Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)}></FormControl>
                                            </Col>
                                        </Row>
                                        <Row className = "formPart" style = {{justifyContent: "center"}}>
                                            <Col md = {10}>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl required value={confrimPassword} placeholder="Confirm Password" id="password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
                                            </Col>
                                        </Row>
                                    </Row>
                                    <Row style={{ justifyContent: "center" }}>
                                        <p>{errorMessage}</p>
                                        <Button id="loginButton" className = "loginButton" variant="primary" type="submit">Reset</Button>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>

    </Container>);
  };

export default ResetPassword;

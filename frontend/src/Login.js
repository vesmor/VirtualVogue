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
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState("");

    const doLogin = async (event) => {
        event.preventDefault();
        console.log(email, password);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = '';

        if (!email.trim()) {
            error = "Enter email!";
            setError(error);
            console.log(errorMessage)
            return;
        }
        else if (!password.trim()) {
            error = "Enter Password!";
            console.log(errorMessage)
            setError(error);
            return;
        }


        console.log("Valid form");

        let jsonPayload = JSON.stringify({
            login: email,
            password: password
        }
        )

        //API stuff here!

        try{
            const response = await fetch('http://localhost:5002/api/Login', {method: 'POST', 
                body: jsonPayload,
                headers:{'Content-Type':'application/json'}
            });

            console.log("Fetch response")

            let res = JSON.parse(await response.text());

            if(res.error){
                console.log('Error');
                return;
            }


            console.log("Success")

            //save info 
            let user = {
                login: res.login,
                password: res.password
            }
            localStorage.setItem('user_data', JSON.stringify(user));
            
            //window.location.href = '/landingpage';
        }
        catch(e){
            alert(e.toString());
            return;
        }

    };

    const openSignup = () => {
        window.location.href = '/signup'
    }

    return (
        <Container fluid className="main-container" id="loginPage">
            <Row>
                <Col md={4} style={{ height: 100, }} id="sideBar">
                    <Row>
                        <h1 className="h1">New Here?</h1>
                    </Row>
                    <Row>
                        <Button type = "button" onClick={openSignup}></Button>
                    </Row>
                </Col>
                <Col>

                    <Row>
                        <Card>
                            <CardBody>
                                <Form onSubmit={doLogin}>
                                    <Row>
                                        <h2 class="h2">Login</h2>
                                    </Row>
                                    <Row class="flex-column">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl required value = {email} placeholder="Email" id="email" type="text" onChange={(e) => setEmail(e.target.value)}></FormControl>
                                    </Row>
                                    <Row class="flex-column">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl required value = {password} placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)}></FormControl>
                                    </Row>
                                    <Row>
                                        <p>{errorMessage}</p>
                                        <Button variant="primary" type="submit">Login</Button>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            </Row>

        </Container>)
}

export default Login;
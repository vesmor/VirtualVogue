import React, { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Card,
    Form,
    CardBody,
    FormLabel,
    FormText,
    Button,
    FormControl,
} from "react-bootstrap";
import "./styles.css";

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessaege, setError] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();

        console.log(email, password);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = '';

        if (!email.trim()) {
            error = "Enter email!";
            setError(error);
            return;
        }
        if (!password.trim()) {
            error = "Enter Password!";
            setError(error);
            return;
        }

        console.log("Valid form");

        let jsonPayload = JSON.stringify({
            email: email,
            password: password
        }
        )

        //API stuff here!

        try{
            let response = await fetch('~/api/Login', {method: 'POST', 
                body: jsonPayload,
                headers:{'Content-Type':'application/json'}
            });

            let res = JSON.parse(await response.text());

            if(res <= 0){
                console.log('Error');
                return;
            }

            //save info 
            let user = {
                login: res.login,
                password: res.password
            }
            localStorage.setItem('user_data', JSON.stringify(user));
            
            //go to landing page
            window.location.href = '/landingpage';
        }
        catch(e){
            alert(e.toString());
            return;
        }

    }

    return (
        <Container fluid class="main-container" id="loginPage">
            <Row>
                <Col md={4} style={{ height: 100, }} id="sideBar">
                    <Row>
                        <h1 class="h1">New Here?</h1>
                    </Row>
                    <Row>
                        <a href="/Signup"></a>
                    </Row>
                </Col>
                <Col text-center>

                    <Row>
                        <Card>
                            <CardBody>
                                <Form onSubmit={doLogin()}>
                                    <Row>
                                        <h2 class="h2">Login</h2>
                                    </Row>
                                    <Row class="flex-column">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl required placeholder="Email" id="email" type="text" onChange={(ev) => setEmail(ev.target.value)}></FormControl>
                                    </Row>
                                    <Row class="flex-column">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl required placeholder="Password" id="password" type="password" onChange={(ev) => setPassword(ev.target.value)}></FormControl>
                                    </Row>
                                    <Row>
                                        <button variant="primary" type="submit">Login</button>
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
import React from "react";
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
    FormControl,
} from "react-bootstrap";
import "./styles.css";
import { Button } from "bootstrap";

function doLogin() {
    email = document.getElementById("email")
    password = document.getElementById("password")
}

const Home = () => {
    return (
        <Container fluid class="main-container" id="loginPage">
            <Row>
                <Col md={6} class="min-vh-100" id="sideBar">
                    <Row>
                        <h1 class="h1">New Here?</h1>
                    </Row>
                    <Row>
                        <a href="/Signup"></a>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <Form onSubmit={doLogin()}>
                            <Row>
                                <h2 class="h2">Login</h2>
                            </Row>
                            <Row class="flex-column">
                                <FormLabel>Email</FormLabel>
                                <FormControl id="email" type="text"></FormControl>
                            </Row>
                            <Row class="flex-column">
                                <FormLabel>Password</FormLabel>
                                <FormControl id="password" type="password"></FormControl>
                            </Row>
                            <Row>
                                <Button variant="primary" type="submit">Login</Button>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Row>

        </Container>)
}

export default Login;
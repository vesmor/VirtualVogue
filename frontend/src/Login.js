import React from "react";
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
import { Button } from "bootstrap";


const Home = () => {
    return (<Container class="main-container" id="registerPage">
        <div class="container-flex text-center">
            <Row>
                <div class="col-md-6 min-vh-100" id="sideBar">
                    <Row>
                        <h1 class="h1">New Here?</h1>
                    </Row>
                    <Row>
                        <Button>Sign Up</Button>
                    </Row>
                </div>
            </Row>
            <Row>
                <Card>
                    <Form>
                        <Row>
                            <h2 class="h2">Login</h2>
                        </Row>
                        <Row class = "flex-column">
                            <label>Email</label>
                            <input type = "text"></input>
                        </Row>
                        <Row class = "flex-column">
                            <label>Password</label>
                            <input type = "password"></input>
                        </Row>
                        <Row>
                            <input type = "submit">Login</input>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </div>
    </Container>)
}

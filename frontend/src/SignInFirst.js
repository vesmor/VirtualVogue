import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import "./styles.css";

function SignInFirst() {
  const navigate = useNavigate();
  const gifUrl = "https://media.tenor.com/0t1tbXP8VJIAAAAi/no-emotiguy.gif";

  return (
    <Container fluid className="signin-first d-flex flex-column vh-100">
      <Row className="flex-grow-1 d-flex">
        <Col className="d-flex justify-content-center align-items-center">
          <Image src={gifUrl} className="no-image" />{" "}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <button onClick={() => navigate("/signin")}>Go to Sign In</button>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInFirst;
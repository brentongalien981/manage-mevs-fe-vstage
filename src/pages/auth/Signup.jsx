import { Helmet } from "react-helmet-async";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import GuestGuard from "../../components/guards/GuestGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import TheForm from "./TheForm";
import SingleErrorAlert from "./SingleErrorAlert";
import ValidationErrorsAlert from "./ValidationErrorsAlert";

const Signup = () => {
  // Show signup key hint for demo purposes.
  let signupKeyHintComp = (
    <Alert>
      <div className="alert-icon">
        <FontAwesomeIcon icon={faLightbulb} fixedWidth />
      </div>
      <div className="alert-message">{`Use this Signup Key for demo purposes: 602b44f9-75be-442c-9903-5edc15227287`}</div>
    </Alert>
  );

  // The main component.
  return (
    <GuestGuard>
      <Helmet title="Sign Up" />
      <Container className="w-100 justify-content-center">
        <Row className="h-100">
          {signupKeyHintComp}
          <SingleErrorAlert />
          <ValidationErrorsAlert />

          <Col sm="10" md="8" lg="6" xl="5" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Sign Up</h1>
              </div>

              <Card>
                <Card.Body>
                  <div className="m-sm-3">
                    <TheForm />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </GuestGuard>
  );
};

export default Signup;

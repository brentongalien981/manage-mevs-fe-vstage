import { Helmet } from "react-helmet-async";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import GuestGuard from "../../components/guards/GuestGuard";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLightbulb,
  faNoteSticky,
} from "@fortawesome/free-regular-svg-icons";

const Signup = () => {
  const {
    error,
    validationErrors,
    isProcessing,
    userCredentials,
    handleInputChange,
    handleSignup,
  } = useAuth();

  // Set error component.
  let errorComp = null;
  if (error) {
    errorComp = (
      <Alert variant="danger" dismissible>
        <div className="alert-icon">
          <FontAwesomeIcon icon={faBell} fixedWidth />
        </div>
        <div className="alert-message">{error}</div>
      </Alert>
    );
  }

  // Set validation error component.
  let validationErrorsComp = null;
  if (validationErrors.length > 0) {
    validationErrorsComp = (
      <Alert variant="danger" dismissible>
        <div className="alert-icon">
          <FontAwesomeIcon icon={faBell} fixedWidth />
        </div>
        <div className="alert-message">
          <ul className="mb-0">
            {validationErrors.map((validationFieldError, index) => (
              <li key={index}>{validationFieldError.message}</li>
            ))}
          </ul>
        </div>
      </Alert>
    );
  }

  // Set form inputs component.
  const formInputs = userCredentials.map((inputData, index) => (
    <Form.Group className="mb-3" key={index}>
      <Form.Label>{inputData.placeholder}</Form.Label>
      <Form.Control
        type={inputData.type}
        name={inputData.name}
        placeholder={inputData.placeholder}
        value={inputData.value}
        onChange={handleInputChange}
      />
    </Form.Group>
  ));

  // Set signup button component.
  let signupBtn = <Button onClick={handleSignup}>Sign up</Button>;
  if (isProcessing) {
    signupBtn = (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" className="me-2" />
      </div>
    );
  }

  // Show signup key for demo purposes.
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
          {errorComp}
          {validationErrorsComp}

          <Col sm="10" md="8" lg="6" xl="5" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Sign Up</h1>
              </div>

              <Card>
                <Card.Body>
                  <div className="m-sm-3">
                    <Form>
                      {formInputs}

                      <div className="d-grid gap-2 mt-3">{signupBtn}</div>
                    </Form>
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

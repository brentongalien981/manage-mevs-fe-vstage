import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import GuestGuard from "../../components/guards/GuestGuard";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { userCredentials, handleInputChange } = useAuth();

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

  return (
    <GuestGuard>
      <Helmet title="Sign Up" />
      <Container className="w-100 justify-content-center">
        <Row className="h-100">
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

                      <div className="d-grid gap-2 mt-3">
                        <Button type="submit" variant="primary" size="lg">
                          Sign up
                        </Button>
                      </div>
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

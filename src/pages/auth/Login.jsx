import { Helmet } from "react-helmet-async";
import GuestGuard from "../../components/guards/GuestGuard";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import TheForm from "./TheForm";
import SingleErrorAlert from "./SingleErrorAlert";
import ValidationErrorsAlert from "./ValidationErrorsAlert";

const Login = () => {
  return (
    <GuestGuard>
      <Helmet title="Sign Up" />
      <Container className="w-100 justify-content-center">
        <Row className="h-100">
          <SingleErrorAlert />
          <ValidationErrorsAlert />

          <Col sm="10" md="8" lg="6" xl="5" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Login</h1>
              </div>

              <Card>
                <Card.Body>
                  <div className="m-sm-3">
                    <TheForm pageName="login" />
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

export default Login;

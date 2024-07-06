import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { orderFormFieldsData } from "./editOrderData";

const EditOrder = () => {
  const { orderId } = useParams();

  function getFormFields(side) {
    // Left form is from 0 to 6 and right form is from 7 to 13.
    const startIndex = side === "left" ? 0 : 7;
    let numFieldsPerSide = 7;

    const formFields = [];
    for (let i = 0; i < numFieldsPerSide; i++) {
      const currentIndex = i + startIndex;
      const field = orderFormFieldsData[currentIndex];
      formFields.push(
        <Form.Group className="mb-3" key={currentIndex}>
          <Form.Label>{field.placeholder}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
          />
        </Form.Group>
      );
    }

    return (
      <Col lg="6">
        <Card>
          <Card.Body>
            <Form>{formFields}</Form>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <>
      <Helmet title="Form Layouts" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Edit Order</h1>

        <Row>
          {getFormFields("left")}
          {getFormFields("right")}

          <Col lg="12">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditOrder;

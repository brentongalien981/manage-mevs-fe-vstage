import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { orderFormFieldsData } from "./editOrderData";
import { myFetch } from "../../utils/myRequestUtils";
import useFloatingAlerts from "../../hooks/useFloatingAlerts";
import MyDateUtils from "../../utils/MyDateUtils";
import { orderStatusOptions } from "../orders/ordersData";

const EditOrder = () => {
  const { orderId } = useParams();
  const [formFieldsData, setFormFieldsData] = useState(orderFormFieldsData);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addAlert } = useFloatingAlerts();

  // Fetch order details by orderId.
  useEffect(() => {
    myFetch({
      url: `/orders/${orderId}`,
      onSuccess: (data) => {
        setOrder(data.order);
        setIsLoading(false);
      },
      onFailure: (errorMessage) => {
        setIsLoading(false);
        addAlert({ message: errorMessage, variant: "danger" });
      },
    });
  }, []);

  function handleInputChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // Set order.
    let updatedOrder = { ...order };
    if (fieldName === "orderStatus") {
      updatedOrder.orderStatus.value = fieldValue;
    } else {
      updatedOrder[fieldName] = fieldValue;
    }

    setOrder(updatedOrder);
  }

  function getFormFields(side) {
    // Left form is from 0 to 6 and right form is from 7 to 13.
    const startIndex = side === "left" ? 0 : 7;
    let numFieldsPerSide = 7;

    const formFields = [];
    for (let i = 0; i < numFieldsPerSide; i++) {
      const currentIndex = i + startIndex;
      const field = formFieldsData[currentIndex];

      // Set the fieldValue.
      let fieldValue = order[field.dbPropName];
      if (
        field.dbPropName === "createdAt" ||
        field.dbPropName === "updatedAt"
      ) {
        fieldValue = MyDateUtils.getDateStringForDate(new Date(fieldValue));
      } else if (field.dbPropName === "orderStatus") {
        fieldValue = order.orderStatus?.value;
      }

      // Set the input.
      formFields.push(
        <Form.Group className="mb-3" key={currentIndex}>
          <Form.Label>{field.placeholder}</Form.Label>
          {field.type === "select" ? (
            // If the field is orderStatus (dropdown input type)...
            <Form.Select
              key={field.name}
              name={field.name}
              value={fieldValue}
              onChange={handleInputChange}
            >
              {orderStatusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          ) : (
            // If the field is the regular input type...
            <Form.Control
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={fieldValue}
              disabled={!field.isEditable}
              onChange={handleInputChange}
            />
          )}
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

  let mainContent = (
    <Row>
      {getFormFields("left")}
      {getFormFields("right")}

      <Col lg="12">
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Col>
    </Row>
  );

  if (isLoading) {
    mainContent = (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Helmet title="Form Layouts" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Edit Order</h1>
        {mainContent}
      </Container>
    </>
  );
};

export default EditOrder;

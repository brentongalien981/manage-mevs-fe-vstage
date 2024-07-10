import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { orderFormFieldsData } from "./editOrderData";
import { myFetch } from "../../utils/myRequestUtils";
import useFloatingAlerts from "../../hooks/useFloatingAlerts";
import OrderForm from "./OrderForm";
import OrderItems from "./OrderItems";
import "./EditOrder.scss";

const EditOrder = () => {
  const { orderId } = useParams();
  const [formFieldsData, setFormFieldsData] = useState(orderFormFieldsData);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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

  async function handleUpdate() {
    // Guard against multiple clicks.
    if (isUpdating) {
      return;
    }

    // Initiate the update process.
    setIsUpdating(true);

    // Prepare the simplified version of the order object.
    const simplifiedOrder = {
      firstName: order.firstName,
      lastName: order.lastName,
      street1: order.street1,
      city: order.city,
      province: order.province,
      postalCode: order.postalCode,
      country: order.country,
      email: order.email,
      phone: order.phone,
      orderStatusValue: order.orderStatus.value,
    };

    // Make the backend update request.
    await myFetch({
      url: `/orders/${orderId}`,
      method: "PUT",
      body: simplifiedOrder,
      onSuccess: (data) => {
        setIsUpdating(false);
        addAlert({
          message: "Order updated successfully.",
          variant: "success",
        });
      },
      onFailure: (errorMessage) => {
        setIsUpdating(false);
        addAlert({
          message: `${errorMessage} Update failed.`,
          variant: "danger",
        });
      },
      onValidationErrors: (multipleErrorsObj) => {
        setIsUpdating(false);

        // Combine multiple errors.
        const errors = multipleErrorsObj.errors.map((e, i) => {
          return <p key={i}>{e.message}</p>;
        });
        const errorsComp = <div>{errors}</div>;

        addAlert({
          message: errorsComp,
          variant: "danger",
        });
      },
    });
  }

  // Set main content.
  let mainContent = (
    <Row>
      <OrderForm
        formFieldsData={formFieldsData}
        order={order}
        handleInputChange={handleInputChange}
      />
      <Col lg="12">
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          {isUpdating ? (
            <Spinner size="sm" animation="border" variant="light" />
          ) : (
            "Update"
          )}
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
        <h2 className="mb-3">Edit Order</h2>
        {mainContent}
        <OrderItems order={order} />
      </Container>
    </>
  );
};

export default EditOrder;

import { Card, Col, Form, Row } from "react-bootstrap";
import MyDateUtils from "../../utils/MyDateUtils";
import { orderStatusOptions } from "../orders/ordersData";
import My from "../../utils/My";

const OrderForm = ({ formFieldsData, order, handleInputChange }) => {
  function getFormFieldContent(field) {
    // Set the fieldValue.
    let fieldValue = formatFieldValue(order, field.dbPropName);
    // The default field content for the regular input type...
    let content = (
      <Form.Control
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={fieldValue}
        disabled={!field.isEditable}
        onChange={handleInputChange}
      />
    );

    switch (field.type) {
      case "select":
        content = (
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
        );
        break;
      case "link":
        // If the fieldValue is empty, display n/a.
        content = (
          <div>
            <Form.Label>n/a</Form.Label>
          </div>
        );
        // If the fieldValue is not empty, display the link.
        if (fieldValue?.length > 0) {
          content = (
            <div>
              <a href={fieldValue} target="_blank">
                Click here for: {field.placeholder}
              </a>
            </div>
          );
        }
        break;
    }

    return content;
  }

  function getFormFields(side) {
    // Set the start and stop indexes based on the side.
    let startIndex = 0;
    let stopIndex = 0;

    for (let i = 0; i < formFieldsData.length; i++) {
      const field = formFieldsData[i];
      if (field.name === "tax") {
        // tax is the last field on the left side.
        if (side === "left") {
          stopIndex = i + 1;
        } else {
          startIndex = i + 1;
          stopIndex = formFieldsData.length;
        }
        break;
      }
    }

    // Loop through the formFieldsData and create the form fields.
    const formFields = [];
    for (let i = startIndex; i < stopIndex; i++) {
      const field = formFieldsData[i];

      // Set the input.
      formFields.push(
        <Form.Group className="mb-3" key={i}>
          <Form.Label>{field.placeholder}</Form.Label>
          {getFormFieldContent(field)}
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
      {getFormFields("left")}
      {getFormFields("right")}
    </>
  );
};

function formatFieldValue(order, dbPropName) {
  let fieldValue = order[dbPropName];

  switch (dbPropName) {
    case "shippingFee":
    case "tax":
      fieldValue = "$" + My.formatToMonetary(fieldValue);
      break;
    case "createdAt":
    case "updatedAt":
      fieldValue = MyDateUtils.getDateStringForDate(
        new Date(order[dbPropName])
      );
      break;
    case "orderStatus":
      fieldValue = fieldValue?.value;
      break;
  }

  return fieldValue;
}

export default OrderForm;

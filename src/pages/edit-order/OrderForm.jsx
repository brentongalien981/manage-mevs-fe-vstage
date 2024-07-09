import { Card, Col, Form, Row } from "react-bootstrap";
import MyDateUtils from "../../utils/MyDateUtils";
import { orderStatusOptions } from "../orders/ordersData";

const OrderForm = ({ formFieldsData, order, handleInputChange }) => {
  function getFormFields(side) {
    // Set the start and stop indexes based on the side.
    let startIndex = 0;
    let stopIndex = 0;

    for (let i = 0; i < formFieldsData.length; i++) {
      const field = formFieldsData[i];
      if (field.name === "tax") {
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
        <Form.Group className="mb-3" key={i}>
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

  return (
    <>
      {getFormFields("left")}
      {getFormFields("right")}
    </>
  );
};

export default OrderForm;

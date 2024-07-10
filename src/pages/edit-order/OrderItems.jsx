import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { orderItemRowSections } from "./editOrderData";
import My from "../../utils/My";

const OrderItems = ({ order }) => {
  /** Set table headers. */
  const tableHeaders = [];
  // Loop through each orderItem's sections: orderItem, product, brand, category.
  orderItemRowSections.forEach((section) => {
    // Loop through each section's properties.
    section.sourcePropsData.forEach((data) => {
      // Push each property name as a table header.
      tableHeaders.push(<th key={data.name}>{data.placeholder}</th>);
    });
  });

  /** Set table rows. */
  const allRows = [];
  // Set each row's orderItem.
  order.orderItems?.forEach((orderItem, i) => {
    const aRow = [];

    // Loop through each orderItem's sections.
    orderItemRowSections.forEach((section) => {
      // Loop through each section's properties.
      section.sourcePropsData.forEach((property) => {
        // Get each section's source of data.
        const source = section.getSource(orderItem);
        // Set the key for each cell.
        const key = `${orderItem._id}-${property.name}`;
        // Set the cell value.
        const cellHintCompleteValue = source[property.dbPropName];
        let cellValue = source[property.dbPropName];
        cellValue = formatCellValue(cellValue, property.name);
        // Push the cell into the row.
        aRow.push(
          <td key={key} title={cellHintCompleteValue}>
            {cellValue}
          </td>
        );
      });
    });

    // Push the row into allRows.
    allRows.push(<tr key={`orderItem-${i}`}>{aRow}</tr>);
  });

  /** The component. */
  return (
    <Row className="order-items">
      <h3>Order Items</h3>
      <Col>
        <div className="w-100">
          <div className="order-items-table-container">
            <Table id="order-items-table" bordered striped hover>
              <thead>
                <tr>{tableHeaders}</tr>
              </thead>

              <tbody>{allRows}</tbody>
            </Table>
          </div>
        </div>
      </Col>
    </Row>
  );
};

function formatCellValue(cellValue, propName) {
  switch (propName) {
    case "price":
      cellValue = "$" + My.formatToMonetary(cellValue);
      break;
    case "name":
      break;
    default:
      if (cellValue?.length > 9) {
        cellValue = cellValue.substring(0, 8) + "...";
      }
      break;
  }

  return cellValue;
}

export default OrderItems;

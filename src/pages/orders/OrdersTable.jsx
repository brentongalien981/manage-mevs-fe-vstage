import {
  faSort,
  faSortAsc,
  faSortDesc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ProgressBar, Table } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import PageNavigator from "./PageNavigator";
import useOrders from "../../hooks/useOrders";
import { useEffect, useState } from "react";
import My from "../../utils/My";
import TheProgressBar from "./TheProgressBar";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function getSortIcon(sortOrder) {
  switch (sortOrder) {
    case "ascending":
      return faSortAsc;
    case "descending":
      return faSortDesc;
    default:
      return faSort;
  }
}

const OrdersTable = () => {
  const { state, queryOrders, handleColumnSort } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    queryOrders();
  }, []);

  // Set up the table headers.
  const tableHeaders = state.ordersTableColumnsData.map((data) => {
    let sortComponent = null;
    if (data.isSortable) {
      sortComponent = (
        <span
          className="sort-icons"
          onClick={() => handleColumnSort(data.dbPropName, data.sortOrder)}
        >
          <FontAwesomeIcon
            icon={getSortIcon(data.sortOrder)}
            className="ms-2"
          />
        </span>
      );
    }

    return (
      <th key={data.name}>
        {data.placeholder}
        {sortComponent}
      </th>
    );
  });

  // Set up the table rows.
  const tableRows = state.orders.map((order, i) => {
    let rowCells = [];

    // Route for editing an order.
    const editOrderRoute = `/orders/${order._id}/edit`;

    // Inject the Actions cell as the first cell of a row.
    rowCells.push(
      <td key={`order${i}-actions`}>
        <Edit2
          className="align-middle me-1 edit-order-icon"
          size={18}
          onClick={() => navigate(editOrderRoute)}
        />
        <Trash
          className="align-middle delete-order-icon"
          size={18}
          onClick={() => alert("TODO: This functionality is pending.")}
        />
      </td>
    );

    // Based on the table column's name, populate the row cells
    for (const columnData of state.ordersTableColumnsData) {
      const dbPropName = columnData.dbPropName;
      let completeCellValue = order[dbPropName];
      let cellValue = order[dbPropName];

      switch (dbPropName) {
        case "_id":
        case "stripePaymentIntentId":
        case "shipmentId":
          // Only show the last 5 characters of the ids...
          cellValue =
            "..." +
            cellValue?.substring(cellValue.length - 5, cellValue.length);
          break;
        case "createdAt":
        case "updatedAt":
          // For dates, just show the date and not time.
          cellValue = cellValue.substring(0, 10);
          break;
        case "orderStatus":
          completeCellValue = cellValue.name;
          cellValue = cellValue.name;
          break;
      }

      rowCells.push(
        <td key={`order${i}-${dbPropName}`} title={completeCellValue}>
          {cellValue}
        </td>
      );
    }

    return <tr key={i}>{rowCells}</tr>;
  });

  // Set up the table depending on if we are querying, have an error, or successfully have data.
  let table = (
    <Table id="the-orders-table" bordered striped hover>
      <thead>
        <tr>
          {/* Inject this Actions column */}
          <th>Actions</th>
          {tableHeaders}
        </tr>
      </thead>

      <tbody>{tableRows}</tbody>
    </Table>
  );

  if (state.isQuerying) {
    table = <TheProgressBar />;
  }

  if (state.queryError) {
    table = (
      <Alert variant="danger" dismissible>
        <div className="alert-icon">
          <FontAwesomeIcon icon={faBell} fixedWidth />
        </div>
        <div className="alert-message">{state.queryError}</div>
      </Alert>
    );
  }

  return (
    <div className="w-100">
      <h2>Orders Table</h2>

      <div className="orders-table-container">{table}</div>

      <PageNavigator />
    </div>
  );
};

export default OrdersTable;

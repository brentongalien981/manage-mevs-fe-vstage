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

  useEffect(() => {
    queryOrders();
  }, []);

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

  const tableRows = state.orders.map((order, i) => {
    let rowCells = [];

    // Inject the Actions cell as the first cell of a row.
    rowCells.push(
      <td key={`order${i}-actions`}>
        <Edit2 className="align-middle me-1" size={18} />
        <Trash className="align-middle" size={18} />
      </td>
    );

    // Based on the table columns name, populate the row cells
    for (const columnData of state.ordersTableColumnsData) {
      const dbPropName = columnData.dbPropName;
      let cellValue = order[dbPropName];

      switch (dbPropName) {
        case "_id":
        case "stripePaymentIntentId":
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
          cellValue = cellValue.name;
          break;
      }

      rowCells.push(<td key={`order${i}-${dbPropName}`}>{cellValue}</td>);
    }

    return <tr key={i}>{rowCells}</tr>;
  });

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

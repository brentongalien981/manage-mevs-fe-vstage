import React from "react";
import { Pie } from "react-chartjs-2";

import { Card, Dropdown, Table } from "react-bootstrap";

import { MoreHorizontal } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

import usePalette from "../../hooks/usePalette";
import useDashboard from "../../hooks/useDashboard";
import {
  formatNumberWithCommas,
  prepareTopSalesDataByCountry,
} from "./dashboardUtils";

const PieChart = () => {
  const palette = usePalette();
  const { ordersDataForCurrentDateRange } = useDashboard();

  const topFourSalesDataByCountry = prepareTopSalesDataByCountry(
    ordersDataForCurrentDateRange
  ).slice(0, 4);

  const themes = ["success", "primary", "warning", "danger", "secondary"];

  const data = {
    labels: topFourSalesDataByCountry.map((data) => data.country),
    datasets: [
      {
        data: topFourSalesDataByCountry.map((data) => data.totalAmount),
        backgroundColor: themes.map((theme) => palette[theme]),
        borderWidth: 5,
        borderColor: palette.white,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "30%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const tableRows = topFourSalesDataByCountry.map((data, i) => {
    const salesAmount = formatNumberWithCommas(
      parseFloat(data.totalAmount.toFixed(2))
    );
    const countryDisplayName =
      data.country.length > 7 ? data.country.slice(0, 7) + "..." : data.country;

    return (
      <tr key={i}>
        <td>
          <FontAwesomeIcon icon={faSquare} className={`text-${themes[i]}`} />
          <span title={data.country}>{` ${countryDisplayName}`}</span>
        </td>
        <td className="text-end">{`$${salesAmount}`}</td>
        <td className="text-end text-success">{`${data.totalOrders}`}</td>
      </tr>
    );
  });

  return (
    <Card className="flex-fill w-100">
      <Card.Header>
        <div className="card-actions float-end">
          <Dropdown align="end">
            <Dropdown.Toggle as="a" bsPrefix="-">
              <MoreHorizontal />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>TODO: Download Image</Dropdown.Item>
              <Dropdown.Item>TODO: Download CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Card.Title className="mb-0">Range Top Sales by Country</Card.Title>
      </Card.Header>

      <Card.Body className="d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-xs">
              <Pie data={data} options={options} />
            </div>
          </div>

          <Table className="mb-0">
            <thead>
              <tr>
                <th>Country</th>
                <th className="text-end">Sales</th>
                <th className="text-end">Orders</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PieChart;

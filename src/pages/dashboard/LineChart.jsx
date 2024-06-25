import React from "react";
import { Line } from "react-chartjs-2";

import { Card, Dropdown } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";
import { MoreHorizontal } from "react-feather";
import useDashboard from "../../hooks/useDashboard";
import My from "../../utils/My";

const LineChart = () => {
  const palette = usePalette();
  const { ordersData, sortedOrdersDataByPeriod } = useDashboard();

  const data = {
    labels: sortedOrdersDataByPeriod.map((data) => data.startDateStr),
    datasets: [
      {
        label: "Sales ($)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: palette.success,
        data: sortedOrdersDataByPeriod.map((data) => data.totalAmount),
        tension: 1, // Adjust this value to control curve smoothness
      },
      {
        label: "Orders",
        fill: true,
        backgroundColor: "transparent",
        borderColor: palette["primary-dark"],
        // borderDash: [4, 4],
        data: sortedOrdersDataByPeriod.map((data) =>
          My.getRandomNumber(0, 10000)
        ),
        tension: 1, // Adjust this value to control curve smoothness
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: false,
      },
    },
    scales: {
      x: {
        // reverse: true,
        stacked: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: {
          stepSize: 10000,
        },
        display: true,
        // borderDash: [5, 5],
        grid: {
          color: "rgba(0,0,0,0)",
          fontColor: "#fff",
        },
      },
    },
  };

  return (
    <Card className="flex-fill w-100">
      <Card.Header>
        <div className="card-actions float-end">
          <Dropdown align="end">
            <Dropdown.Toggle as="a" bsPrefix="-">
              <MoreHorizontal />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Download PDF</Dropdown.Item>
              <Dropdown.Item>Download CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Card.Title className="mb-0">Monthly Sales & Orders</Card.Title>
      </Card.Header>

      <Card.Body className="d-flex">
        <div className="align-self-center w-100">
          <div className="chart chart-lg">
            <Line data={data} options={options} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LineChart;

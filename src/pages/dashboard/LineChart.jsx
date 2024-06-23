import React from "react";
import { Line } from "react-chartjs-2";

import { Card, Dropdown } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";
import { MoreHorizontal } from "react-feather";

const LineChart = () => {
  const palette = usePalette();

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales ($)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: palette.success,
        data: [
          2115, 1562, 1584, 1892, 1487, 2223, 2966, 2448, 2905, 3838, 2917,
          3327,
        ],
      },
      {
        label: "Orders",
        fill: true,
        backgroundColor: "transparent",
        borderColor: palette["primary-dark"],
        borderDash: [4, 4],
        data: [958, 724, 0, 883, 915, 1214, 1476, 1212, 1554, 2128, 1466, 1827],
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
          stepSize: 500,
        },
        display: true,
        borderDash: [5, 5],
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

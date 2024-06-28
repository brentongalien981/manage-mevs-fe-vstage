import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";
import useDashboard from "../../hooks/useDashboard";
import My from "../../utils/My";
import MyDateUtils from "../../utils/MyDateUtils";

const AreaChart = () => {
  const palette = usePalette();
  const {
    sortedOrdersDataByPeriod,
    previousRangeSortedOrdersDataByPeriod,
    periodFrequency,
  } = useDashboard();

  const data = [
    {
      name: "Sales ($)",
      data: sortedOrdersDataByPeriod.map((data) => data.totalAmount),
    },
    {
      name: "PoP Sales ($)",
      data: previousRangeSortedOrdersDataByPeriod.map(
        (data) => data.totalAmount
      ),
    },
  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: sortedOrdersDataByPeriod.map((data) =>
        MyDateUtils.getDateStringForDate(data.startDate)
      ),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          // Format the amount to have commas as thousand separators.
          return new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(value);
        },
      },
    },
    colors: [
      palette.success,
      palette.primary,
      palette.warning,
      palette.danger,
      palette.info,
    ],
  };

  return (
    <Card className="w-100">
      <Card.Header>
        <Card.Title>{`${periodFrequency} Sales`}</Card.Title>
        <h6 className="card-subtitle text-muted">{`${periodFrequency} Sales this range period VS previous range period`}</h6>
      </Card.Header>
      <Card.Body>
        <div className="chart w-100">
          <Chart options={options} series={data} type="line" height="350" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AreaChart;

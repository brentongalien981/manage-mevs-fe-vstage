import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";
import useDashboard from "../../hooks/useDashboard";
import My from "../../utils/My";
import MyDateUtils from "../../utils/MyDateUtils";
import { prepareSortedOrdersDataByPeriodFrequency } from "./dashboardData";
import { extractPreviousRangeDateStrings } from "./dashboardUtils";

const AreaChart = () => {
  const palette = usePalette();
  const {
    ordersDataForCurrentDateRange,
    ordersDataForPreviousDateRange,
    rangeStartDateStr,
    rangeEndDateStr,
    periodFrequency,
  } = useDashboard();

  // Set the previous range variables for chart comparisons.
  const { previousRangeStartDateStr, previousRangeEndDateStr } =
    extractPreviousRangeDateStrings(rangeStartDateStr, rangeEndDateStr);

  // Data for current range.
  const sortedOrdersDataByPeriodForCurrentRange =
    prepareSortedOrdersDataByPeriodFrequency(
      ordersDataForCurrentDateRange,
      rangeStartDateStr,
      rangeEndDateStr,
      periodFrequency
    );

  // Data for previous range.
  const sortedOrdersDataByPeriodForPreviousRange =
    prepareSortedOrdersDataByPeriodFrequency(
      ordersDataForPreviousDateRange,
      previousRangeStartDateStr,
      previousRangeEndDateStr,
      periodFrequency
    );

  // Actual graph data.
  const data = [
    {
      name: "Sales ($)",
      data: sortedOrdersDataByPeriodForCurrentRange.map(
        (data) => data.totalAmount
      ),
    },
    {
      name: "PoP Sales ($)",
      data: sortedOrdersDataByPeriodForPreviousRange.map(
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
      categories: sortedOrdersDataByPeriodForCurrentRange.map((data) =>
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
        <h6 className="card-subtitle text-muted">{`${periodFrequency} sales this range period VS previous range period`}</h6>
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

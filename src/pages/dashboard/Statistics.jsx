import React from "react";
import { Badge, Col, Card, Row } from "react-bootstrap";

import { DollarSign, ShoppingBag } from "react-feather";

import illustration from "../../assets/img/illustrations/customer-support.png";
import useDashboard from "../../hooks/useDashboard";
import {
  extractDashboardStats,
  formatNumberWithCommas,
} from "./dashboardUtils";

const Statistics = () => {
  const {
    periodFrequency,
    ordersDataForCurrentDateRange,
    ordersDataForPreviousDateRange,
  } = useDashboard();

  const stats = extractDashboardStats(
    ordersDataForCurrentDateRange,
    ordersDataForPreviousDateRange
  );

  const welcomeTileComponent = (
    <Col md="6" xl className="d-flex">
      <Card className="illustration flex-fill">
        <Card.Body className="p-0 d-flex flex-fill">
          <Row className="g-0 w-100">
            <Col xs="6">
              <div className="illustration-text p-3 m-1">
                <p className="mb-0">Welcome to your Dashboard!</p>
              </div>
            </Col>
            <Col xs={6} className="align-self-end text-end">
              <img
                src={illustration}
                alt="Customer Support"
                className="img-fluid illustration-img"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );

  const statsComponents = stats.map((stat, i) => {
    return (
      <Col md="6" xl className="d-flex" key={i}>
        <Card className="flex-fill">
          <Card.Body className=" py-4">
            <div className="d-flex align-items-start">
              <div className="flex-grow-1">
                <h3 className="mb-2">{`${stat.currency}${formatNumberWithCommas(
                  stat.currentRangeValue
                )} ${stat.unit}`}</h3>
                <p className="mb-2">{stat.label}</p>
                {getGrowthRateStatComponent(stat.growthRatePercentage)}
              </div>
              <div className="d-inline-block ms-3">
                <div className="stat">{getStatIcon(stat)}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  function getStatIcon(stat) {
    switch (stat.name) {
      case "totalSales":
        return <DollarSign className="align-middle text-success" />;
      case "totalOrders":
      case "processingOrders":
        return <ShoppingBag className="align-middle text-success" />;
      default:
        null;
    }
  }

  // Get Range on Range growth stat.
  function getGrowthRateStatComponent(percentage) {
    let badgeClassName = "";
    let growthDirectionMsg = "";
    let growthPercentageLabel = "";

    if (percentage > 0) {
      badgeClassName = "badge-soft-success";
      growthDirectionMsg = "Up since last range";
      growthPercentageLabel = `+${percentage.toFixed(2)}%`;
    } else if (percentage < 0) {
      badgeClassName = "badge-soft-danger";
      growthDirectionMsg = "Down since last range";
      growthPercentageLabel = `-${percentage.toFixed(2)}%`;
    }

    return (
      <div className="mb-0">
        <Badge bg="" className={`${badgeClassName} me-2`}>
          {growthPercentageLabel}
        </Badge>
        <span className="text-muted">{growthDirectionMsg}</span>
      </div>
    );
  }

  return (
    <Row>
      {welcomeTileComponent}
      {statsComponents}
    </Row>
  );
};

export default Statistics;

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

import Header from "./Header";
import Statistics from "./Statistics";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Dashboard = () => (
  <React.Fragment>
    <Helmet title="Daily Summary" />
    <Container fluid className="p-0">
      <Header />

      <Statistics />

      <Row>
        <Col lg="8" className="d-flex">
          <LineChart />
        </Col>

        <Col lg="4" className="d-flex">
          <PieChart />
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default Dashboard;

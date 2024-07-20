import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

import Header from "./Header";
import Statistics from "./Statistics";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import "./dashboard.scss";
import DashboardProvider from "../../contexts/DashboardProvider";
import AreaChart from "./AreaChart";

const Dashboard = () => (
  <DashboardProvider>
    <React.Fragment>
      <Helmet title="Daily Summary" />
      <Container fluid className="p-0 dashboard">
        <Header />

        <Statistics />

        <Row>
          <Col lg="8" className="d-flex">
            {/* <LineChart /> */}
            <AreaChart />
          </Col>

          <Col lg="4" className="d-flex">
            <PieChart />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  </DashboardProvider>
);

export default Dashboard;

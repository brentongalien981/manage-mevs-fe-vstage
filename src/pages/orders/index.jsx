import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import OrdersTable from "./OrdersTable";
import OrdersTableFilters from "./OrdersTableFilters";
import OrdersProvider from "../../contexts/OrdersProvider";
import "./Orders.css";

const Orders = () => {
  return (
    <OrdersProvider>
      <Helmet title="Daily Summary" />
      <Container fluid className="p-0">
        <Row>
          <Col lg="3" className="d-flex">
            <OrdersTableFilters />
          </Col>

          <Col lg="9" className="d-flex">
            <OrdersTable />
          </Col>
        </Row>
      </Container>
    </OrdersProvider>
  );
};

export default Orders;

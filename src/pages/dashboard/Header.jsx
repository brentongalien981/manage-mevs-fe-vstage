import React from "react";

import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";

const PERIOD_FREQUENCIES = ["Daily", "Weekly", "Monthly", "Yearly"];

const Header = () => {
  return (
    <Row className="mb-2 mb-xl-3">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Dashboard</h3>
      </Col>

      <Col xs="auto" className="ms-auto text-end mt-n1">
        <Form.Group style={{ display: "inline-block" }}>
          <Form.Label style={{ display: "inline-block", width: "auto" }}>
            From
          </Form.Label>
          <Form.Control
            style={{ display: "inline-block", width: "auto" }}
            type={"date"}
            name={"date"}
            value={"2018-02-16"}
            onChange={() => {}}
          />
        </Form.Group>

        <Form.Group style={{ display: "inline-block" }}>
          <Form.Label style={{ display: "inline-block", width: "auto" }}>
            To
          </Form.Label>
          <Form.Control
            style={{ display: "inline-block", width: "auto" }}
            type={"date"}
            name={"date"}
            value={"2021-08-01"}
            onChange={() => {}}
          />
        </Form.Group>
        <Dropdown className="d-inline me-2">
          <Dropdown.Toggle variant="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Daily
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {PERIOD_FREQUENCIES.map((periodF, i) => (
              <Dropdown.Item key={i}>{periodF}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="primary" className="shadow-sm">
          <RefreshCw className="feather" />
        </Button>
      </Col>
    </Row>
  );
};

export default Header;

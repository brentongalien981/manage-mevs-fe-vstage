import React from "react";

import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";
import useDashboard from "../../hooks/useDashboard";

const PERIOD_FREQUENCIES = ["Daily", "Weekly", "Monthly", "Yearly"];

const Header = () => {
  const {
    isQuerying,
    isResetting,
    rangeStartDateStr,
    rangeEndDateStr,
    periodFrequency,
    handleRangeDateChange,
    handlePeriodFrequencyChange,
    handleQuery,
  } = useDashboard();

  // Set apply button content.
  let applyBtnContent = "Apply";
  if (isQuerying) {
    applyBtnContent = <Spinner size="sm" animation="border" variant="light" />;
  }

  return (
    <Row className="mb-2 mb-xl-3">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Dashboard</h3>
      </Col>

      <Col xs="auto" className="ms-auto text-end mt-n1">
        <Form.Group className="date-input-group">
          <Form.Label>From</Form.Label>
          <Form.Control
            type={"date"}
            name={"rangeStartDateStr"}
            value={rangeStartDateStr}
            onChange={handleRangeDateChange}
          />
        </Form.Group>

        <Form.Group className="date-input-group">
          <Form.Label>To</Form.Label>
          <Form.Control
            style={{ display: "inline-block", width: "auto" }}
            type={"date"}
            name={"rangeEndDateStr"}
            value={rangeEndDateStr}
            onChange={handleRangeDateChange}
          />
        </Form.Group>
        <Dropdown
          className="d-inline me-2"
          onSelect={handlePeriodFrequencyChange}
        >
          <Dropdown.Toggle variant="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" />
            {` ${periodFrequency}`}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {PERIOD_FREQUENCIES.map((freq, i) => (
              <Dropdown.Item eventKey={freq} key={i}>
                {freq}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="primary" className="shadow-sm" onClick={handleQuery}>
          {applyBtnContent}
        </Button>

        <Button variant="warning" className="shadow-sm">
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default Header;

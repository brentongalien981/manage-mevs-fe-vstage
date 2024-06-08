import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Navbar, Nav, Form, InputGroup } from "react-bootstrap";

import { Search } from "react-feather";

import useSidebar from "../../hooks/useSidebar";

import NavbarUser from "./NavbarUser";

const NavbarComponent = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <Navbar variant="light" expand className="navbar-bg">
      <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline="true" className="d-none d-sm-inline-block">
        <InputGroup className="input-group-navbar">
          <Form.Control
            placeholder={"Search ft coming next..."}
            aria-label="Search"
          />
          <Button variant="">
            <Search className="feather" />
          </Button>
        </InputGroup>
      </Form>

      <Navbar.Collapse>
        <Nav className="navbar-align">
          <NavbarUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

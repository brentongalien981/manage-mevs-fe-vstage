import React from "react";

import { Dropdown } from "react-bootstrap";

import { PieChart, Settings, User } from "react-feather";

import defaultProfilePic from "../../assets/img/avatars/avatar.jpg";
import useAuth from "../../hooks/useAuth";

const NavbarUser = () => {
  const { isLoggedIn, handleLogout, email } = useAuth();

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            src={defaultProfilePic}
            className="avatar img-fluid rounded-circle me-1"
            alt="Profile Pic"
          />
          <span className="text-dark">{email ?? `Admin`}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          TODO: Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          TODO: Cron Jobs
        </Dropdown.Item>
        <Dropdown.Divider />
        {isLoggedIn && (
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;

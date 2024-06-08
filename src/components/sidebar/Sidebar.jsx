import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarNav from "./SidebarNav";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Sidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Logo /> <span className="align-middle me-3">Manage-MEVs</span>
          </a>

          <SidebarNav />
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;

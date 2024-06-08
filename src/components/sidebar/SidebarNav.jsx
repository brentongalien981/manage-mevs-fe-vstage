import React from "react";
import { ShoppingBag, TrendingUp, Truck } from "react-feather";
import { Link } from "react-router-dom";

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav">
      <li className="sidebar-item">
        <Link to={`/daily-summary`} className="sidebar-link">
          {<TrendingUp className="feather align-middle" />}Daily Summary
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to={`/orders`} className="sidebar-link">
          {<ShoppingBag className="feather align-middle" />}Orders
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to={`/returns`} className="sidebar-link">
          {<Truck className="feather align-middle" />}Returns
        </Link>
      </li>
    </ul>
  );
};

export default SidebarNav;

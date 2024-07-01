import React from "react";
import { Package, ShoppingBag, TrendingUp, Truck, User } from "react-feather";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SidebarNav = () => {
  const { isLoggedIn } = useAuth();

  return (
    <ul className="sidebar-nav">
      <li className="sidebar-item">
        <Link to={`/dashboard`} className="sidebar-link">
          {<TrendingUp className="feather align-middle" />}Dashboard
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to={`/orders`} className="sidebar-link">
          {<ShoppingBag className="feather align-middle" />}Orders
        </Link>
      </li>

      <li className="sidebar-item">
        <Link to={`/products`} className="sidebar-link">
          {<Package className="feather align-middle" />}Products
        </Link>
      </li>

      <li className="sidebar-item">
        <Link to={`/returns`} className="sidebar-link">
          {<Truck className="feather align-middle" />}Returns
        </Link>
      </li>

      {!isLoggedIn && (
        <>
          <li className="sidebar-item">
            <Link to={`/signup`} className="sidebar-link">
              {<User className="feather align-middle" />}Signup
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to={`/login`} className="sidebar-link">
              {<User className="feather align-middle" />}Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default SidebarNav;

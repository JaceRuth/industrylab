import React from "react";
import { Link } from "react-router-dom";
import "./styling/header.css"

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="title">Cyber Security Lab</h1>
        <ul className="list">
          <li className="item">
            <Link to="/" className="link">Home</Link>
          </li>
          <li className="item">
            <Link to="/salting" className="link">Salting</Link>
          </li>
          <li className="item">
            <Link to="/validation" className="link">Validation</Link>
          </li>
          <li className="item">
            <Link to="/roles" className="link">Roles</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


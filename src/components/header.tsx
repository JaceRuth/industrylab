import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyles}>
      <nav style={navStyles}>
        <h1 style={titleStyles}>Cyber Security Lab</h1>
        <ul style={listStyles}>
          <li style={itemStyles}>
            <Link to="/" style={linkStyles}>Home</Link>
          </li>
          <li style={itemStyles}>
            <Link to="/salting" style={linkStyles}>Salting</Link>
          </li>
          <li style={itemStyles}>
            <Link to="/authentication" style={linkStyles}>Authentication</Link>
          </li>
          <li style={itemStyles}>
            <Link to="/roles" style={linkStyles}>Roles</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyles = {
  backgroundColor: "#282c34",
  padding: "10px 20px",
  color: "#fff",
  textAlign: "center",
};

const navStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyles = {
  margin: "0",
  fontSize: "24px",
};

const listStyles = {
  display: "flex",
  listStyleType: "none",
  margin: "0",
  padding: "0",
};

const itemStyles = {
  margin: "0 10px",
};

const linkStyles = {
  color: "#61dafb",
  textDecoration: "none",
  fontSize: "18px",
};

export default Header;

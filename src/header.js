import React from "react";
import { Link } from "react-router-dom";
import {authentication} from "./pages/authentication.tsx"
import {login} from "./pages/authentication.tsx"
import {roles} from "./pages/authentication.tsx"

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/login" style={styles.link}>
          Salting
        </Link>
        <Link to="/authentication" style={styles.link}>
          Authentication
        </Link>
        <Link to="/roles" style={styles.link}>
          Roles
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: "10px",
    backgroundColor: "#282c34",
    display: "flex",
    justifyContent: "center",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Header;
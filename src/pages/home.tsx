import React from "react"; 
import "../components/styling/home.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Industry Lab</h1>
      <p>Your introduction Salting, Input Validation, and Roles & Permissions.</p>

      <div className="sections">
        <div className="section" onClick={() => window.location.href='/salting'}>
          <h2>Salting</h2>
          <p>
            Explore the concept of salting in cryptography, an essential part of securing passwords and sensitive data.
          </p>
        </div>

        <div className="section" onClick={() => window.location.href='/validation'}>
          <h2>Input Validation</h2>
          <p>
            Learn how input validation helps protect against harmful data, including SQL injection and other attacks.
          </p>
        </div>

        <div className="section" onClick={() => window.location.href='/roles'}>
          <h2>Roles & Permissions</h2>
          <p>
            Understand how roles and permissions work to manage access control and security within applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


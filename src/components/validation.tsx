import React, { useState } from "react";
import "./styling/validation.css"

const Validation: React.FC = () => {
  type Errors = {
    email?: string;
    password?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});


  // TODO: Implement this method, validate all form fields by using regular expressions. 
  const validateForm = (): boolean => {
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="form-container">
      <h1>Form with Address Validation</h1>
      <form onSubmit={handleSubmit} className="validation-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="input-field"
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input-field"
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="zip">ZIP Code:</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="input-field"
          />
          {errors.zip && <span className="error">{errors.zip}</span>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Validation;




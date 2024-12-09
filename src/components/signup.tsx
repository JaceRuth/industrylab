import React, { useState } from 'react';
import './styling/login.css';
import bcrypt from "bcryptjs";

const Login = ({mockAPIPost}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  // TODO: Handle the submission of the password. Salt and hash the password and 
  // and "store" it in the API. 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      setError("");

      // Pass data to parent (saltingPage)
      if (mockAPIPost) {
        mockAPIPost(email, hashedPassword);
      }

      console.log("Signup successful!", { email, hashedPassword });
    } catch (error) {
      console.error("Error hashing password:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
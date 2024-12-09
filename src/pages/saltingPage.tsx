import React, { useState } from "react";
import Login from "../components/signup.tsx"

const SaltingPage= () => {
  const database = new Map();
  const [email, setEmail] = useState('');
  const [hash, setHash] = useState('')

  // Function to store credentials in the "database"
  const mockAPIPost = (email, hashedPassword) => {
    if (database.has(email)) {
      console.error("Email already exists!");
      return;
    }
    setEmail(email)
    setHash(hashedPassword)
    database.set(email, hashedPassword);
    console.log("Database updated:", Array.from(database.entries())); // Log the database
  };
  return (
  <div>
    <Login mockAPIPost={mockAPIPost}></Login>
    <h1>Email and Key</h1>
    <div>{email}</div>
    <div>{hash}</div>
  </div>
  )
};

export default SaltingPage;
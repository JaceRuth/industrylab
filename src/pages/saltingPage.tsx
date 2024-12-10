import React, { useState } from "react";
import Signup from "../components/signup"
import Login from "../components/login"
import "./styling/pages.css"

const SaltingPage= () => {
  const database = new Map();
  const [signupEmail, setSignupEmail] = useState('');
  const [signupHash, setSignupHash] = useState('');
  const [signupSalt, setSignupSalt] = useState('')
  const [loginEmail, setLoginEmail] = useState('');
  const [loginHash, setLoginHash] = useState('')
  const [matchLogin, setMatchLogin] = useState(false);

  // Function to store credentials in the "database"
  const mockAPIPost = (email: React.SetStateAction<string>, hashedPassword: React.SetStateAction<string>, Salt: React.SetStateAction<string>) => {
    if (database.has(email)) {
      console.error("Email already exists!");
      return;
    }
    setSignupEmail(email)
    setSignupHash(hashedPassword)
    setSignupSalt(Salt)

    database.set(email, hashedPassword);
    console.log("Database updated:", Array.from(database.entries())); // Log the database
  };


  const mockAPIPull = (email: React.SetStateAction<string>, hashedPassword: React.SetStateAction<string>) => {
    if (database.has(email)) {
      console.error("Email already exists!");
      return;
    }
    setLoginEmail(email)
    setLoginHash(hashedPassword)
    if(email === signupEmail && hashedPassword === signupHash){
      setMatchLogin(true);
    }else{
      setMatchLogin(false);
    }
    
  };

  return (
  <div>
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {/* Two Login components side by side */}
        <div> 
          <Signup mockAPIPost={mockAPIPost}></Signup>
          <h1>Email and Key</h1>
          <div>{signupEmail}</div>
          <div>{signupHash}</div>
          
        </div>
        <div>
          <Login mockAPIPull={mockAPIPull}></Login>
          <div className="email-key-container" style={{backgroundColor: matchLogin ? 'green':'red'}}>
            <h1>Email and Key</h1>
            <div>{loginEmail}</div>
            <div>{loginHash}</div>
          </div>
        </div>
    </div>
  </div>
  )
};

export default SaltingPage;
import React, { useState } from "react";
import Signup from "../components/signup"
import Login from "../components/login"
import "./styling/pages.css"
import crypto from "crypto-js";
import { hashPassword, checkPassword, SALT } from '../components/hashingService';

const SaltingPage= () => {
  const [database, setDatabase] = useState<
    Map<string, { hash: string; salt: string }>
  >(new Map());
  const [signupEmail, setSignupEmail] = useState('');
  const [signupHash, setSignupHash] = useState('');
  const [signupSalt, setSignupSalt] = useState('')
  const [loginEmail, setLoginEmail] = useState('');
  const [loginHash, setLoginHash] = useState('')
  const [matchLogin, setMatchLogin] = useState(false);
  const [message, setMessage] = useState("");

  // Function to store credentials in the "database"
  const mockAPIPost = (email: React.SetStateAction<string>, password: React.SetStateAction<string>) => {
    if (database.has(email as string)) {
      setMessage("Error: Email already exists!");
      return;
    }
    const hashedPassword = hashPassword(password as string);
    setSignupEmail(email)
    setSignupHash(hashedPassword)
    setSignupSalt(SALT)

    setMatchLogin(email === signupEmail && loginHash === signupHash);

    database.set(email as string, { hash: hashedPassword, salt: SALT });
    console.log(database)
    console.log("Database updated:", Array.from(database.entries())); // Log the database
  };


  const mockAPIPull = (email: React.SetStateAction<string>, attemptedPassowrd: React.SetStateAction<string>) => {
    console.log("in pull" + email)
    console.log(database)
    if(database.has(email as string)){
      console.log("in if" + email)
      let salt = database.get(email as string)?.salt
      console.log(salt)
      setLoginEmail(email)
      let hashAttempt = checkPassword(attemptedPassowrd as string, salt as string);
      setLoginHash(hashAttempt)
      if(email === signupEmail && hashAttempt === signupHash){
        setMatchLogin(true);
      }else{
        setMatchLogin(false);
      }
    }  
    
  };

  return (
  <div>
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {/* Two Login components side by side */}
        <div> 
          <Signup mockAPIPost={mockAPIPost}></Signup>
        </div>
        <div>
          <Login mockAPIPull={mockAPIPull}></Login>
        </div>
    </div>
    <h1>Email and Key</h1>
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <div className="email-key-container">
        <div>{"Current Sign Up Email: " + signupEmail}</div>
        <div>{"Current Log In Email: " + loginEmail}</div>
      </div>
      <div className="email-key-container" style={{backgroundColor: matchLogin ? 'green':'red'}}>
        <div>{"Current Sign Up Hash: " + signupHash}</div>
        <div>{"Current Log In Hash: " + loginHash}</div>
      </div>
    </div>
  </div>
  )
};

export default SaltingPage;
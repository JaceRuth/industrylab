import React, { useState } from "react";
import Signup from "../components/signup"
import Login from "../components/login"
import "./styling/pages.css"

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
  const apiPostUser = (email: React.SetStateAction<string>, password: React.SetStateAction<string>) => {
    if (database.has(email as string)) {
      setMessage("Error: Email already exists!");
      return;
    }
    // TO DO: hash password and store in database
    const hashedPassword = ""
    database.set(email as string, { hash: hashedPassword, salt: "" });
    
    // TODO: set the Salt
    setSignupSalt("")

    // do not touch
    setSignupEmail(email)
    setSignupHash(hashedPassword)
    setMatchLogin(email === signupEmail && loginHash === signupHash);
  };

  // Function to pull credentials in the "database"
  const apiPullUser = (email: React.SetStateAction<string>, attemptedPassowrd: React.SetStateAction<string>) => {
    if(database.has(email as string)){
      // todo: get the salt from the database and check the password
      let salt = ""
      let hashAttempt = ""

      // do not touch
      setLoginHash(hashAttempt)
      setLoginEmail(email)
      if(email === signupEmail && hashAttempt === signupHash && hashAttempt.length != 0){
        setMatchLogin(true);
      }else{
        setMatchLogin(false);
      }
    }  
    
  };

  return (
  <div>
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <div> 
          <Signup mockAPIPost={apiPostUser}></Signup>
        </div>
        <div>
          <Login mockAPIPull={apiPullUser}></Login>
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
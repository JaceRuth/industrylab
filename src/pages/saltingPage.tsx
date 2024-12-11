import React, { useState } from "react";
import Signup from "../components/signup"
import Login from "../components/login"
import "./styling/pages.css"
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
  const apiPostUser = (email: React.SetStateAction<string>, password: React.SetStateAction<string>) => {
    if (database.has(email as string)) {
      setMessage("Error: Email already exists!");
      return;
    }
    // to do: hash password and store in database
    const hashedPassword = hashPassword(password as string);
    database.set(email as string, { hash: hashedPassword, salt: SALT });
    
    // do not touch
    setSignupEmail(email)
    setSignupHash(hashedPassword)
    setSignupSalt(SALT)
    setMatchLogin(email === signupEmail && loginHash === signupHash);
  };


  const apiPullUser = (email: React.SetStateAction<string>, attemptedPassowrd: React.SetStateAction<string>) => {
    if(database.has(email as string)){
      // todo: get the salt from the database and check the password
      let salt = database.get(email as string)?.salt
      let hashAttempt = checkPassword(attemptedPassowrd as string, salt as string);

      // do not touch
      setLoginHash(hashAttempt)
      setLoginEmail(email)
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
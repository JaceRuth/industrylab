import crypto from "crypto-js";

// todo: Add salt value
//export const SALT = "constant_salt_value";

export const generateSalt = (length: number = 16): string => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array); // Use Web Crypto API
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const SALT = generateSalt(16);


// Function to hash with salt
export const hashPassword = (password: string) => {
    const saltedPassword = SALT + password;
    console.log("In the service" + saltedPassword)
    return crypto.SHA256(saltedPassword).toString(crypto.enc.Hex);
  };

  export const hashPasswordWithSalt = (password: string, salt: string) => {
    const saltedPassword = SALT + password;
    console.log("In the service" + saltedPassword)
    return crypto.SHA256(saltedPassword).toString(crypto.enc.Hex);
  };


export const checkPassword = (password: string, salt: string) => {
    const saltedPassword = salt + password;
    console.log("In the service" + saltedPassword)
    return crypto.SHA256(saltedPassword).toString(crypto.enc.Hex);
}
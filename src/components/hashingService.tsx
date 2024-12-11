import crypto from "crypto-js";

// TODO: GENERATE SALT VALUE
export const generateSalt = (length: number = 16): string => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array); 
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const SALT = generateSalt(16);


// TODO: FILL IN METHOD
export const hashPassword = (password: string) => {
    const saltedPassword = SALT + password;
    return crypto.SHA256(saltedPassword).toString(crypto.enc.Hex);
  };

// TODO: FILL IN METHOD
export const checkPassword = (password: string, salt: string) => {
    const saltedPassword = salt + password;
    return crypto.SHA256(saltedPassword).toString(crypto.enc.Hex);
}
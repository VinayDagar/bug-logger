import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

// https://www.npmjs.com/package/secure-web-storage
const SECRET = process.env.REACT_APP_SECURE_STORAGE_SECRET_KEY;

export const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        return CryptoJS.SHA256(key, SECRET).toString();
    },
    encrypt: function encrypt(data) {
        return CryptoJS.AES.encrypt(data, SECRET).toString();
    },
    decrypt: function decrypt(data) {
        return CryptoJS.AES.decrypt(data, SECRET).toString(CryptoJS.enc.Utf8);
    }
});

window.$storage = secureStorage;

export default secureStorage;

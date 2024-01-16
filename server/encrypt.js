const CryptoJS = require('crypto-js');
const {encryptKey } = require('./config.json');
const encryptedMessage = CryptoJS.AES.encrypt('rp2', encryptKey).toString();
console.log(encryptedMessage)
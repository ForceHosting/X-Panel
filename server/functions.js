const fetch = require('node-fetch');



module.exports.makeid = function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789234565434567876543201256793028048736503845';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};

module.exports.makeWebUser = function makeWebUser(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
};

module.exports.getIP = async function getIP() {
  const {ip} = await fetch('https://api.ipify.org?format=json', { method: 'GET' })
      .then(res => res.json())
      .catch(error => console.error(error));
  return ip
}
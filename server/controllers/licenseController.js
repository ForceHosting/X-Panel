const License = require("../models/licenseModel");


module.exports.getLicense = async (req, res, next) => {
  try{
    const bearerHeader = req.headers['authorization'];
    const bearerSplit = bearerHeader.split(" ");
    const bearerToken = bearerSplit[1];
    let licenseData = await License.findOne({ 'licenseId': bearerToken }).select([
      "licenseValid",
    ]);
    return res.json(licenseData)
  }catch(ex){
    next(ex)
  }
}
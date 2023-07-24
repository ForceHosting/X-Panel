// const License = require("../models/licenseModel");

const dbc = require("./catodb");

module.exports.getLicense = async (req, res, next) => {
  try{
    const bearerHeader = req.headers['authorization'];
    const bearerSplit = bearerHeader.split(" ");
    const bearerToken = bearerSplit[1];
    let licenseData = await dbc.fetch({table:"test",filters:{column:"licenseId",value:bearerToken}});
    return res.send(licenseData)
  }catch(ex){
    next(ex)
  }
}
const Licenses = require('../models/licensingModel');


module.exports.getLicense = async (req, res, next) => {
    try {
        const licenseData = await Licenses.find({ licenseKey: req.params.id }).select([
            "licenseUsers",
        ])
        return res.json({ licenseData });
      } catch (ex) {
        next(ex);
      }
  };
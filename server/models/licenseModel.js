const mongoose = require("mongoose");

const LicenseSchema = mongoose.Schema(
  {
    licenseId: {
      type: String,
      required: true,
    },
    licenseOwner: {
      type: String,
      required: true,
    },
    licenseValid: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Licenses", LicenseSchema);
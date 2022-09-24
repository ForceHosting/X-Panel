const {
    newPayPalPayment
  } = require("../controllers/paymentController");
  
  const router = require("express").Router();
  
  router.post("/paypal/new", newPayPalPayment);
  
  module.exports = router;
  
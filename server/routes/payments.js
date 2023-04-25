const {
    newPayPalPayment,
    getAllPayments,
    getPayment
  } = require("../controllers/paymentController");
  
  const router = require("express").Router();
  
  router.post("/paypal/create/web", newPayPalPayment);
  router.get("/fetch", getAllPayments)
  router.get("/:id", getPayment)
  
  module.exports = router;
  
  
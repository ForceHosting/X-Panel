const User = require("../models/userModel");
const { addedToQueue } = require("../bot");


module.exports.addToQueue = async (req, res, next) => {
    try {
        const { userUid, prodName, prodPrice, prodDesc } = req.body;
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": prodName,
                        "price": prodPrice,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": prodPrice
                },
                "description": prodDesc
            }]
        };
      } catch (ex) {
        next(ex);
      }
  };
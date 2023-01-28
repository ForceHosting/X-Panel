const Subscriptions = require("../models/subscriptions");
const Web = require("../models/webhostingModel");
const { createPaymentLog, newWebUser } = require("../bot");
const { directAdminAuth, jwtToken } = require("../config")
const jwt = require('jsonwebtoken')
const {makeid, makeWebUser, makeInvoiceId} = require('../functions')
const fetch = require('node-fetch');
const Payments = require("../models/payments");
const { response } = require("express");



  module.exports.newPayPalPayment = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const jwtVerify = jwt.verify(bearerHeader,jwtToken)
        const userUid = jwtVerify._id;
        const {subscriptionId, orderId, price } = req.body;
        let package;
        let packageDesc;
        if(price == 2){
            package = 'beginner'
            packageDesc = 'Beginner webhosting plan'
        }else if(price == 8){
            package = 'startup'
            packageDesc = 'Startup webhosting plan'
        }else if(price == 12){
            package = 'business'
            packageDesc = 'Business webhosting plan'
        }
        const newInvoiceId = makeInvoiceId(15)
        const paymentCreate = await Subscriptions.create({
            paymentUser: userUid,
            productType: 'webhost',
            productPrice: price,
            subscriptionId: subscriptionId,
            orderId: orderId,
            nextPurchaseTime: Math.floor(Date.now() / 1000) + 2592000
        });
        const createPayment = await Payments.create({
            paymentUser: userUid,
            subscriptionId: subscriptionId,
            invoiceId: newInvoiceId,
            productName: package,
            productPrice: price,
            productDescription: packageDesc,
        })
        const randomUsername = makeWebUser(5);
            const newRandomPass = makeid(15)
            var newRandomPassBuffer = Buffer.from(newRandomPass);
            var encryptedPass = newRandomPassBuffer.toString('base64');
        const randomDomain = makeWebUser(10);
        
        const webData = await fetch(`https://d2.my-control-panel.com:2222/CMD_API_ACCOUNT_USER?action=create&add=Submit&username=${randomUsername}&email=${jwtVerify.email}&passwd=${newRandomPass}&passwd2=${newRandomPass}&domain=${randomDomain}.delete&package=${package}&ip=198.251.83.217&notify=yes`, {
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Basic ${directAdminAuth}`
      },
    });
	const data = await webData.text()
	const regex = 'error=0'
	if(data.includes(regex) === true){
        Web.create({
            panelUser: randomUsername,
            panelPwd: encryptedPass,
            planType: package,
            planDomain: randomDomain+".delete",
            accountHolder: jwtVerify._id,
            paidPlan: true,
        })
        newWebUser(jwtVerify.username, randomDomain)
        createPaymentLog(subscriptionId, orderId, jwtVerify.username);
        return res.json({ status: 200, payload: paymentCreate })
    }else{
        return res.json({ status: 500, payload: 'There was an error creating the webhosting account user. Please contact support.'})
    }
      } catch (ex) {
        next(ex);
      }
  };


  module.exports.getAllPayments = async (req, res, next) => {
try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    const userUid = jwtVerify._id;
    const payments = await Payments.find({ 'paymentUser': userUid});
    return res.json({ status: 200, payments});
  } catch (ex) {
    next(ex);
  }
}

module.exports.getPayment = async (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        const jwtVerify = jwt.verify(bearerHeader,jwtToken)
        const userUid = jwtVerify._id;
        const invoiceId = req.params.id;
        const paymentInfo = await Payments.findOne({ 'invoiceId': invoiceId });
        return res.json({status: 200, paymentInfo})
    }catch (ex) {
        next(ex);
    }
}
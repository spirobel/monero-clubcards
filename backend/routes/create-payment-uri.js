//test this in the browser with:
//fetch("/create-payment-uri").then(resp=> resp.json()).then(j=> console.log(j))
var express = require('express');
var router = express.Router();
const monerojs = require("monero-javascript");
const MoneroTxConfig = monerojs.MoneroTxConfig;
const BigInteger = monerojs.BigInteger;
async function createPaymentUri(wallet){
  wallet = await wallet
  let integratedAddress = await wallet.getIntegratedAddress();
//let address = integratedAddress.getIntegratedAddress();
  //let paymentId = integratedAddress.getPaymentId(); // 16 characters write this to req.app.locals.payment or write it to the session
  let paymentUri = await wallet.createPaymentUri(new MoneroTxConfig().setAddress(integratedAddress.getIntegratedAddress()).setAmount(new BigInteger("1")))
  return paymentUri;
}
/* GET users listing. */
router.get('/', function(req, res, next) {


  createPaymentUri(req.app.locals.wallet).then(function(paymentUri){
    res.json({"payment_uri":paymentUri})
  }).catch(function(err){
    res.json({"error":"createPaymentUri promise failed."+err})
  })


});

module.exports = router;


var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var register = require('../backend_xmr3.js').register
var login = require('../backend_xmr3.js').login
var createPaymentUri = require('../backend_xmr3.js').createPaymentUri


const mfa_address = "75jZRMyxRMjbvX38GaAsARaQ1exeBCVkUbPTfGssBfXQ5VPor4eA144YpUE7FNg5bLcpEuehNne23MkG8ZMCkPEeTqtwPsG"
const mfa_amount = 250000000000;
const mfa_description = "Monero Farmers Association";
const mfa_image = "http://localhost:9000/images/monero_farmer.png";
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged_in){
    res.render('index', { title: 'Monero Farmers Association - logged in! YEHAAA!' });

  } else {
    res.render('index', { title: 'Monero Farmers Association - Not logged in' });
  }
});
/* GET buy clucard info. */
router.get('/buy', async function(req, res, next) {
     const paymentUri = await createPaymentUri(req.app.locals.wallet, mfa_address,mfa_amount)
     res.json({"payment_uri":paymentUri, "description": mfa_description, "image": mfa_image})
  });
  /* GET random string to use as message for get_tx_proof. */
router.get('/register', function(req, res, next) {
    var register_message = crypto.randomBytes(20).toString('hex');
    req.session.register_message = register_message;
    res.json({register_message});
  });
    /* POST random string to use as message for get_tx_proof. */
router.post('/register', async function(req, res, next) {

  if(!req.session.register_message){
    res.json({success: false});
  }

  const txHash = String(req.body.txHash)
  const signature = String(req.body.signature)

  if(await register(req.app.locals.wallet,
     req.app.locals.db, mfa_amount,
      txHash, mfa_address,
       req.session.register_message,
        signature))
        { //TODO: set logged_in to true here as well
          req.session.logged_in = true;
          res.json({success: true});
        }
  else {
    res.json({success: false});
  }

  });
  /* GET random string to use as message for get_spend_proof.*/
router.get('/login', function(req, res, next) {
  var login_message = crypto.randomBytes(20).toString('hex');
  req.session.login_message = login_message;
  res.json({login_message});
  });

  router.get('/logged_in', function(req, res, next) {
    let logged_in = req.session.logged_in ? true : false;
    
    res.json({logged_in});
    });

      /* POST random string to use as message for get_spend_proof. */
router.post('/login', async function(req, res, next) {

  if(!req.session.login_message){
    res.json({success: false});
  }

  const txHash = String(req.body.txHash)
  const signature = String(req.body.signature)

  if(await login(req.app.locals.wallet,
     req.app.locals.db, 
     mfa_address,
      txHash, 
       req.session.login_message,
        signature))
        {
          req.session.logged_in = true;
          res.json({success: true});
        }
  else {
    res.json({success: false});
  }

  });

module.exports = router;

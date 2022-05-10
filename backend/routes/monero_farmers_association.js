var express = require('express');
var router = express.Router();
var crypto = require("crypto");
import {register, createPaymentUri} from '../backend_xmr3'

const mfa_address = "72hFPVqkVjY5LQnyRkqkmJHVDKG5kxMmnYAbz9MKtUbuiJoteaJ1LNzMG6jVMt5MXN81qSxoZhFKq98xgjQfrEkZEuHvZJM"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Not logged in' });
});
/* GET home page. */
router.get('/buy', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  /* GET random string to use as message for get_tx_proof. */
router.get('/register', function(req, res, next) {
    var register_message = crypto.randomBytes(20).toString('hex');
    req.session.register_message = register_message;
    res.json({register_message});
  });
    /* POST random string to use as message for get_tx_proof. */
router.post('/register', function(req, res, next) {


  const txHash = String(req.body.txHash)
  const signature = String(req.body.signature)

  if(register(req.app.locals.wallet,
     req.app.locals.db, 5,
      txHash, mfa_address,
       req.session.register_message,
        signature))
        {
          res.json({success: true});
        }
  else {
    res.json({success: false});
  }

  });
  /* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

module.exports = router;

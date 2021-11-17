var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const monerojs = require("monero-javascript");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
main();
async function main() {
  // connect to daemon
let daemon = await monerojs.connectToDaemonRpc("http://node.sethforprivacy.com:18089").catch(error => console.log("wallet sync failed, error message: "+ error));
let height = await daemon.getHeight();            // 1523651
let feeEstimate = await daemon.getFeeEstimate();  // 1014313512
let txsInPool = await daemon.getTxPool();   
console.log(height,feeEstimate,txsInPool)
  let viewOnlyWallet = await monerojs.createWalletFull({
    networkType: 'mainnet',
    primaryAddress: "477Q68aPB5yb5kTcjUS7BRSence2f1Fo8aNXFgjFHzPG5jhwpN19W48HvnBFSEPZUxfaoVXCSiptxjbsXm27pL4b7QMQQtA",
    privateViewKey: "fa12ae79d64af5dd5e8e736925951c5edb54fc12e7902ada414b7b951aed8f08",
    password: 'password',
    restoreHeight: 2473000,
    serverUri: "http://node.sethforprivacy.com:18089",
  });
  await viewOnlyWallet.sync().catch(error => console.log("wallet sync failed, error message: "+ error))
  console.log("syncing worked")
}
// viewOnlyWalletPromise.then((viewOnlyWallet)=>{


 // viewOnlyWallet.sync(new class extends monerojs.MoneroWalletListener {
 //   onSyncProgress(height, startHeight, endHeight, percentDone, message) {
 //     // feed a progress bar?
 //     console.log(height, startHeight, endHeight, percentDone, message)
 //   }
 // })
//  viewOnlyWallet.sync().then(()=>{
//    return viewOnlyWallet.startSyncing(5000);
//  }).catch(error => {
//    console.error('inside wallet.sync promise rejected function called: ' + error.message);
//  });
//
//
//
// }).catch(error => {
//  console.error('outside createwalletpromise rejected function called: ' + error.message);
//})

module.exports = app;

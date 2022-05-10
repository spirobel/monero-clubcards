var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const monerojs = require("monero-javascript");
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient  

var mfaRouter = require('./routes/monero_farmers_association')
var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Shh, its a secret!"}));

 //client.db('monerochan').collection('transactions').insertOne()
app.use('/', indexRouter);
app.use('/monero_farmers_association', mfaRouter)

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
app.locals.wallet = monero_wallet();
app.locals.db = openDb()

async function monero_wallet() {
  let wallet = await monerojs.createWalletFull({
    networkType: 'stagenet',
    primaryAddress: "55Py9fSwyEeQX1CydtFfPk96uHEFxSxvD9AYBy7dwnYt9cXqKDjix9rS9AWZ5GnH4B1Z7yHr3B2UH2updNw5ZNJEEnv87H1",
    privateViewKey: "1195868d30373aa9d92c1a21514de97670bcd360c209a409ea3234174892770e",
    password: 'password',
    restoreHeight: 957038,
  });
  await wallet.setDaemonConnection("http://stagenet.xmr-tw.org:38081");
  return wallet
}
async function openDb(){
  const client = await new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true }).connect();
  return client.db('monerochan')
}

module.exports = app;

const monerojs = require("monero-javascript");
const MoneroTxConfig = monerojs.MoneroTxConfig;
const BigInteger = monerojs.BigInteger;
const MoneroUtils = monerojs.MoneroUtils;
module.exports.createPaymentUri = async function(wallet, standardAddress, amount){
    wallet = await wallet
    let networkType = wallet.getNetworkType();
    // get integrated address with randomly generated payment id
    let integratedAddress = MoneroUtils.getIntegratedAddress(networkType, standardAddress);
    //let paymentId = integratedAddress.getPaymentId(); // 16 characters write this to req.app.locals.payment or write it to the session
    let paymentUri = await wallet.createPaymentUri(new MoneroTxConfig().setAddress(integratedAddress.getIntegratedAddress()).setAmount(new BigInteger(amount)))
    return paymentUri;
}

 //client.db('monerochan').collection('transactions').insertOne()
 module.exports.register = async function(wallet, db, amount, txHash, address, message, signature){
    wallet = await wallet
    const check = await wallet.checkTxProof(txHash, address, message, signature) 

    if( check.isGood() && check.getReceivedAmount().compare(new BigInteger(amount)) >= 0){
        await db('monerochan').collection('registrations').insertOne({
            txHash, address
        })
        return true
    } else {
        return false
    }
}

module.exports.login = async function(wallet, db, address, txHash, message, signature){
    wallet = await wallet
    const regs = await db('monerochan').collection('registrations').find({txHash, address}).toArray()
    if(!regs[0].txHash){ return false}
    const check = await wallet.checkSpendProof(regs[0].txHash, message, signature) 
    return check
}
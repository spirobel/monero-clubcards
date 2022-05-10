const monerojs = require("monero-javascript");
const MoneroTxConfig = monerojs.MoneroTxConfig;
const BigInteger = monerojs.BigInteger;
const MoneroUtils = monerojs.MoneroUtils;
export async function createPaymentUri(wallet, standardAddress, amount){
    wallet = await wallet
    let networkType = wallet.getNetworkType();
    // get integrated address with randomly generated payment id
    let integratedAddress = MoneroUtils.getIntegratedAddress(networkType, standardAddress);
    //let paymentId = integratedAddress.getPaymentId(); // 16 characters write this to req.app.locals.payment or write it to the session
    let paymentUri = await wallet.createPaymentUri(new MoneroTxConfig().setAddress(integratedAddress.getIntegratedAddress()).setAmount(new BigInteger(amount)))
    return paymentUri;
}

 //client.db('monerochan').collection('transactions').insertOne()
export async function register(wallet, db, amount, txHash, address, message, signature){
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
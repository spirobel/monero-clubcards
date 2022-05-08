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
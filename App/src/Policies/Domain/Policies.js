const PolicieError = require('./PoliciesException/PolicieError');
const Policie = function(id, amountInsured, email, inceptionDate,installmentPayment,clientId){
    const policie = {
        'id': null,
        'amountInsured': amountInsured,
        'email': email,
        'inceptionDate': inceptionDate,
        'installmentPayment':installmentPayment,
        'clientId':null

    };
    setId(id);
    setClientId(clientId);
    function setId(id){
        if ( !id){
            throw new PolicieError('Policy Id not provided', 400);
        }
        policie.id = id;
    }
    function setClientId(clientId){
        if ( !clientId){
            throw new PolicieError('ClientId not provided', 400);
        }
        policie.clientId = clientId;
    }

    return policie;
};
module.exports = Policie;
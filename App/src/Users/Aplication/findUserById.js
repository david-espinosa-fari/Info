
const UserError= require('../Domain/UserException/UserError');
const findUserById = function(clientRepo){
    return {
        invoke: search
    };
    function search(clientId){
        return new Promise(function(resolve, reject){
            if ( !clientId){
                reject(new UserError('User id not provide ', 400));
            } else{
                const user = clientRepo.findUserById(clientId);
                if (user instanceof UserError){
                    reject(user);
                } else{
                    resolve(user);
                }
            }
        });
    }
};

module.exports = findUserById;

const findPolicyById = require('../../Policies/Aplication/findPolicyById');
const mockyPoliciesRepo = require('../../Policies/Infraestructure/PoliceMockyRepo');
const findUserById = require('../Aplication/findUserById');
const mockyUsersRepo = require('../Infraestructure/mockyUsersRepository');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const callback = function(req, res){
    try {
        const payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);
        if (payload.role !== 'admin'){
            throw new Error('User not admin');
        }
        findPolicyById(mockyPoliciesRepo).invoke(req.params.number)
            .then(function(Policy){
                findUserById(mockyUsersRepo).invoke(Policy.clientId).then(function(User){
                    res.status(200).send(User);
                }).catch(function(userError){
                    res.status(userError.code).send(userError.message);
                });
            }).catch(function(PolicyError){
            res.status(PolicyError.code).send(PolicyError.message);
        });
    } catch (e){
        return res.status(403).send('User not authorized');
    }
};
module.exports = callback;
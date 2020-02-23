const filterUsersByName = require('../Aplication/filterUsersByName');
const mockyUsersRepo = require('../Infraestructure/mockyUsersRepository');
const findUserPolicies = require('../Aplication/findUserPolicies');
const mockyPoliciesRepo = require('../../Policies/Infraestructure/PoliceMockyRepo');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const callback = function(req, res){
    try {
        const payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);
        if (payload.role !== 'admin'){
            throw new Error('User not admin');
        }
        filterUsersByName(mockyUsersRepo).invoke(req.params.name)
            .then(async function(users){
                const usersCount = users.length;
                const usersWithPolicies = [];
                for (let i = 0; i < usersCount; i++){
                    await findUserPolicies(mockyPoliciesRepo).invoke(users[i].id)
                        .then(function(userPolicies){
                            users[i].policies = userPolicies;
                            usersWithPolicies.push(users[i]);
                        }).catch(function(policieError){
                            //I only put a console log but could add details of
                            // why no policies were found for the user and add it to the answer
                            console.error('policieError', policieError);
                        });
                }
                if (usersWithPolicies.length > 0){
                    res.status(200).send(JSON.stringify(usersWithPolicies));
                } else{
                    res.status(404).send('Not polices found for this name');
                }
            })
            .catch(function(UserError){
                console.error('UserError', UserError);
                res.status(UserError.code).send(UserError.message);
            });
    } catch (e){
        return res.status(403).send('User not authorized');
    }
};
module.exports = callback;
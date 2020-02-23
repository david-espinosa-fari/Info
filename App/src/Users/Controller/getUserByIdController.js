const findUserById = require('../Aplication/findUserById');
const mockyRepo = require('../Infraestructure/mockyUsersRepository');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const callback = function(req, res){
    try {
        const payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);
        console.log(payload);
        if (payload.role !== 'admin' && payload.role !== 'user'){
            throw new Error('User not admin');
        }
        findUserById(mockyRepo).invoke(req.query.id)
            .then(function(client){
                res.status(200).send(client);
            })
            .catch(function(ClientsError){
                console.log('client Error', ClientsError);
                res.status(ClientsError.code).send(ClientsError.message);
            });
    } catch (e){
        return res.status(403).send('User not authorized');
    }
};
module.exports = callback;


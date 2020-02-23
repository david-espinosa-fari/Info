const filterUsersByName = require('../Aplication/filterUsersByName');
const mockyRepo = require('../Infraestructure/mockyUsersRepository');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const callback = function(req, res){
    try {
        const payload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);
        if (payload.role !== 'admin' && payload.role !== 'user'){
            throw new Error('User not admin');
        }
        filterUsersByName(mockyRepo).invoke(req.query.name)
            .then(function(users){
                //I return an array because I understand that names can be repeated
                res.status(200).send(JSON.stringify(users));
            })
            .catch(function(ClientsError){
                res.status(ClientsError.code).send(ClientsError.message);
            });
    } catch (e){
        return res.status(403).send('User not authorized');
    }
};
module.exports = callback;
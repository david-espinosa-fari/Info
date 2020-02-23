const hash = require('jshashes');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const findUserByUserName = require('../Aplication/findUserByUsername');
const userRepo = require('../Infraestructure/fakeDbUsersRepository');
const userError = require('../Domain/UserException/UserError');
const callback = function(req, res){
    const username = req.body.username;
    const passwordHash = new hash.SHA256(req.body.password).hex(req.body.password);
    const user = findUserByUserName(userRepo).invoke(username);
    if (passwordHash === user.password && user instanceof !userError){
        const signedKey = config.TOKEN_SECRET;
        const tokenPayload = {
            'username': username,
            'role': user.role
        };
        const token = jwt.encode(tokenPayload, signedKey, 'HS512');
        res.status(200).send({'token': token});
    } else{
        res.status(403).send('Access denied');
    }
};
module.exports = callback;
const hash = require('jshashes');
const jwt = require('jwt-simple');
const config = require('../../config/config');
const fakeUserAdmin = {
    'username': 'david',
    'password': 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',//password = a
    'role': 'admin'
};
const callback = function(req, res){
    const username = req.body.username;
    const passwordHash = new hash.SHA256(req.body.password).hex(req.body.password);
    if (username === fakeUserAdmin.username && passwordHash === fakeUserAdmin.password){
        const signedKey = config.TOKEN_SECRET;
        const tokenPayload = {
            'username': username,
            'role': fakeUserAdmin.role
        };
        const token = jwt.encode(tokenPayload, signedKey, 'HS512');
        res.status(200).send({'token': token});
    } else{
        res.status(404).send('token');
    }
};
module.exports = callback;
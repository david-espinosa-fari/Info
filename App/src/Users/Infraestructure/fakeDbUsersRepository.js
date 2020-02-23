const userError = require('../Domain/UserException/UserError');
const fakeDbRepo = function(){
    const fakeUserAdmin = {
        'username': 'david',
        'name':'david',
        'password': 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',//password = a
        'role': 'admin',
        'email':'def@gmail.com',
        'id':'a0ece5db-cd14-4f21-812f-966633e7cq43'
    };
    return{
        findUserByUsername:findUserByUsername
    };

    function findUserByUsername(username){
        if (username === fakeUserAdmin.username) {
            return fakeUserAdmin;
        }
        return new userError('User not found',404);
    }
};
module.exports = fakeDbRepo();
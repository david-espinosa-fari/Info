const ClientError = require('./ClientsException/ClientsError');
const Client = function(id, name, email, role){
    const client = {
        'id': '',
        'name': name,
        'email': email,
        'role': ''
    };
    setId(id);
    setRole(role);
    function setId(id){
        if ( !id){
            throw new ClientError('ClientError Id not provided.', 400);
        }
        client.id = id;
    }
    function setRole(role){
        if ( !role){
            throw new ClientError('ClientError role not provided.', 400);
        }
        client.role = role;
    }
    return client;
};
module.exports = Client;
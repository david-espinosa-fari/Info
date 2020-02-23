const request = require('request');
const User = require('../Domain/User');
const UserError = require('../Domain/UserException/UserError');
const mockyRepo = function(){
    const options = {
        url: 'http://www.mocky.io/v2/5808862710000087232b75ac',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    return {
        findUserById: findClientById,
        filterUserByName: filterClientByName
    };
    function findClientById(clientId){
        return new Promise(function(resolve, fail){
            request(options, function(err, res, body){
                if (err){
                    fail(new UserError('Remote request fail', 500));
                } else{
                    let mockyResponse = JSON.parse(body);
                    const count = mockyResponse.clients.length;
                    if (count > 0){
                        for (let i = 0; i < count; i++){
                            if (clientId === mockyResponse.clients[i].id){
                                resolve(User(
                                    mockyResponse.clients[i].id,
                                    mockyResponse.clients[i].name,
                                    mockyResponse.clients[i].email,
                                    mockyResponse.clients[i].role));
                            }
                        }
                    }
                    fail(new UserError('Id provided not found', 404));
                }
            });
        });
    }
    function filterClientByName(name){
        return new Promise(function(resolve, fail){
            const usersFilters = [];
            request(options, function(err, res, body){
                if (err){
                    fail(new UserError('Remote request fail', 500));
                } else{
                    let mockyResponse = JSON.parse(body);
                    const count = mockyResponse.clients.length;
                    for (let i = 0; i < count; i++){
                        if (name === mockyResponse.clients[i].name){
                            usersFilters.push(User(
                                mockyResponse.clients[i].id,
                                mockyResponse.clients[i].name,
                                mockyResponse.clients[i].email,
                                mockyResponse.clients[i].role));
                        }
                    }
                    if (usersFilters.length > 0){
                        resolve(usersFilters);
                    }
                    fail(new UserError('Name provided not found', 404));
                }
            });
        });
    }
};
module.exports = mockyRepo();
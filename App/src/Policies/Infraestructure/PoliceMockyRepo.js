const request = require('request');
const Policie = require('../Domain/Policies');
const PolicieError = require('../Domain/PoliciesException/PolicieError');
const PoliceMockyRepo = function(){
    const options = {
        url: 'http://www.mocky.io/v2/580891a4100000e8242b75c5',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    return {
        fetchUserPolicies: findUserPoliced,
        findPolicyById: findPolicyById
    };
    function findUserPoliced(userId){
        return new Promise(function(resolve, fail){
            const policeFilters = [];
            request(options, function(err, res, body){
                if (err){
                    fail(new PolicieError('Remote request to policies fail', 500));
                } else{
                    let mockyResponse = JSON.parse(body);
                    const count = mockyResponse.policies.length;
                    for (let i = 0; i < count; i++){
                        if (userId === mockyResponse.policies[i].clientId){
                            policeFilters.push(
                                Policie(
                                    mockyResponse.policies[i].id,
                                    mockyResponse.policies[i].amountInsured,
                                    mockyResponse.policies[i].email,
                                    mockyResponse.policies[i].inceptionDate,
                                    mockyResponse.policies[i].installmentPayment,
                                    mockyResponse.policies[i].clientId
                                )
                            );
                        }
                    }
                    if (policeFilters.length > 0){
                        resolve(policeFilters);
                    }
                    fail(new PolicieError('Not policies found for this client', 404));
                }
            });
        });
    }
    function findPolicyById(policyId){
        return new Promise(function(resolve, fail){
            request(options, function(err, res, body){
                if (err){
                    fail(new PolicieError('Remote request to policies fail', 500));
                } else{
                    let mockyResponse = JSON.parse(body);
                    const count = mockyResponse.policies.length;
                    for (let i = 0; i < count; i++){
                        if (policyId === mockyResponse.policies[i].id){
                            try {
                                const policy = Policie(
                                    mockyResponse.policies[i].id,
                                    mockyResponse.policies[i].amountInsured,
                                    mockyResponse.policies[i].email,
                                    mockyResponse.policies[i].inceptionDate,
                                    mockyResponse.policies[i].installmentPayment,
                                    mockyResponse.policies[i].clientId
                                );
                                resolve(policy);
                            } catch (e){
                                fail(new PolicieError(e.message, e.code));
                            }
                        }
                    }
                    fail(new PolicieError('Policy id not found', 404));
                }
            });
        });
    }
};
module.exports = PoliceMockyRepo();
const findUserPolicies = function(policiesRepo){
    return {
        invoke: search
    };
    function search(userId){
        return policiesRepo.fetchUserPolicies(userId);
    }
};
module.exports = findUserPolicies;
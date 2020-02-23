const findPolicyById = function(policyRepo){
    return {
        invoke: search
    };
    function search(policyId){
        return policyRepo.findPolicyById(policyId);
    }
};

module.exports = findPolicyById;
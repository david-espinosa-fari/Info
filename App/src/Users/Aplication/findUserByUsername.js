const findUserByUsername = function(userRepo){
    return {
        invoke: search
    };
    function search(username){
        return userRepo.findUserByUsername(username);
    }
};
module.exports = findUserByUsername;
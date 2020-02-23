const filterUsersByName = function(clientRepo){
    return {
        invoke: filter
    };

    function filter(name){
        return clientRepo.filterUserByName(name);
    }
};

module.exports = filterUsersByName;
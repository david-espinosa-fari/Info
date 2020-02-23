const express = require('express');
const router = express.Router();
const getUserDataFilterById = require('../Users/Controller/getUserByIdController');
const getUserDataFilterByName = require('../Users/Controller/getUsersByNameController');

router.get('/user', function(req, res, next){
    if (req.query.id){
        getUserDataFilterById(req, res);
    }else if (req.query.name){
        getUserDataFilterByName(req, res);
    }else{
        next();
    }
});

router.get('/user/:name/policies',require('../Users/Controller/getPoliciesLinkedUserNameController'));
router.get('/policy/:number/user',require('../Users/Controller/getUserByPolicyNumberController'));
router.post('/login',require('../Users/Controller/postLoginController'));
module.exports = router;
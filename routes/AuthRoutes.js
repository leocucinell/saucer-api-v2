/*
    This file contains all routes related to authentication
*/
//SECTION: Requires
const router = require('express').Router();
const controller = require('../controllers');

//SECTION: Routes. 
//NOTE: Base -> /auth
router.route('/login').post(controller.auth.login_user);
router.route('/logout').post(controller.auth.logout_user);


//SECTION: Exports
module.exports = router;
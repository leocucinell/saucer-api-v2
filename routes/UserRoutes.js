/*
    This file contains all routes related to users
*/
//SECTION: Requires
const router = require('express').Router();
const controller = require('../controllers');

//SECTION: Routes. 
//NOTE: Base -> /user
router.route('/new').post(controller.user.create_user);
router.route('/retrieve').get(controller.user.retrieve_user);
router.route('/update').put(controller.user.update_user);


//SECTION: Exports
module.exports = router;
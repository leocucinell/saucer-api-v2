/*
    This file contains all routes related to restuarants
*/
//SECTION: Requires
const router = require('express').Router();
const controller = require('../controllers');

//SECTION: Routes. 
//NOTE: Base -> /restuarant
router.route('/new').post(controller.restuarant.create_restuarant);
router.route('/retrieve').get(controller.restuarant.retrieve_restuarant);
router.route('/update').put(controller.restuarant.update_resturaunt);
router.route('/city_list').get(controller.restuarant.retrieve_city_restuarant_list)


//SECTION: Exports
module.exports = router;
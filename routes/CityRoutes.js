/*
    This file contains all routes related to cities
*/
//SECTION: Requires
const router = require('express').Router();
const controller = require('../controllers');

//SECTION: Routes. 
//NOTE: Base -> /city
router.route('/city_list').get(controller.city.retrieve_cities_list);

//SECTION: Exports
module.exports = router;
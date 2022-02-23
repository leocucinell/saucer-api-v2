/*
    This file contains all routes related to reservations
*/
//SECTION: Requires
const router = require('express').Router();
const controller = require('../controllers');

//SECTION: Routes. 
//NOTE: Base -> /reservation
router.route('/retrieve').get(controller.reservation.retrieve_reservation);
router.route('/user_list').get(controller.reservation.retrieve_user_reservations);
router.route('/restuarant_list').get(controller.reservation.retrieve_restuarant_reservations);
router.route('/add').post(controller.reservation.add_reservation);
router.route('/delete').delete(controller.reservation.delete_reservation);


//SECTION: Exports
module.exports = router;
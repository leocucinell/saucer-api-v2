/*
    This file contains all API route methods pertaining to reservations
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//SECTION: Related methods
const retrieve_reservation = (req, res) => {
    res.send('Get Reservation');
}

const retrieve_user_reservations = (req, res) => {
    res.send('List of reservations for a particular user')
}

const retrieve_restuarant_reservations = (req, res) => {
    res.send('Restrieve list of restuarant reservations')
}

const add_reservation = (req, res) => {
    res.send('Add Reservation');
}

const delete_reservation = (req, res) => {
    res.send('Delete Reservation');
}

//SECTION: Exports
module.exports = {
    retrieve_reservation,
    retrieve_user_reservations,
    add_reservation,
    delete_reservation,
    retrieve_restuarant_reservations
}
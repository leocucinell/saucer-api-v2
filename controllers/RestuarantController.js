/*
    This file contains all API route methods pertaining to restuarants
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//SECTION: Related methods
const retrieve_city_restuarant_list = (req, res) => {
    res.send('List of restuarants by city');
}

const retrieve_restuarant = (req, res) => {
    res.send('Retrieve single restuarant');
}

const create_restuarant = (req, res) => {
    res.send('Create a new restuarant');
}

const update_resturaunt = (req, res) => {
    res.send('Update a resturaunt')
}



//SECTION: Exports
module.exports = {
    retrieve_city_restuarant_list,
    retrieve_restuarant,
    create_restuarant,
    update_resturaunt
}
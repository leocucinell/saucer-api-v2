/*
    This file contains all API route methods pertaining to cities
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//SECTION: Related methods
const retrieve_cities_list = async (req, res) => {
    try{

        const cities_list = await prisma.city.findMany()
        res.send(cities_list)

    } catch(err) {
        console.log(`Error retrieving cities: ${err}`);
    }
}

//SECTION: Exports
module.exports = {
    retrieve_cities_list
}
/*
    This file contains all API route methods pertaining to customers
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//SECTION: Related methods
const create_user = (req, res) => {
    res.send('Create User');
}

const retrieve_user = (req, res) => {
    res.send('Retrieve User');
}

const update_user = (req, res) => {
    res.send('Update User');
}

//SECTION: Exports
module.exports = {
    create_user,
    retrieve_user,
    update_user
}
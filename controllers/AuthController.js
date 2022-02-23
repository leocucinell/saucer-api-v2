/*
    This file contains all API route methods pertaining to customers
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//SECTION: Related methods
const login_user = (req, res) => {
    res.send('User logged in');
}

const logout_user = (req, res) => {
    res.send('User logged out');
}

//SECTION: Exports
module.exports = {
    login_user,
    logout_user
}
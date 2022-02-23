/*
    This file contains all API route methods pertaining to customers.
    It issues jwt tokens and makes sure that users are who they say they are
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

//SECTION: Related methods
const login_user = async (req, res) => {
    //retrieve the user with the provided username
    //check to see if the provided password matches the found user
    //sign jwt tokens and send back information
    try{
        const clientExistsCheck = await prisma.customer.findUnique({
            where: {
                username: req.body.username
            }
        });
        if(clientExistsCheck){
            res.send('IN PROGRESS...')
        } else {
            res.status(200).json({
                message: 'User does not exist'
            })
        }
        
    } catch(err) {
        console.log(`Error login: ${err}`);
        res.status(400).json({
            message: 'Error logging user in, please try again.'
        })
    }
}

const logout_user = (req, res) => {
    res.send('User logged out');
}

//SECTION: Exports
module.exports = {
    login_user,
    logout_user
}
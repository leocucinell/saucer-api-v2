/*
    This file contains all API route methods pertaining to customers.
    It issues jwt tokens and makes sure that users are who they say they are
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            const comparedPass = await bcrypt.compare(req.body.password, clientExistsCheck.password, (err, result) => {
                if(err){
                    res.status(400).json({
                        message: 'Unable to compare passwords, please try again'
                    });
                }
                else if (!result) {
                    res.status(400).json({
                        message: 'Incorrect password, please try again'
                    });
                } else {
                    //no error and password success
                    //send back JWT and customer data
                    const accessToken = jwt.sign(
                        {"username": req.body.username},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '1d'}
                    );
                    const refreshToken = jwt.sign(
                        {"username": req.body.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn: '1w'}
                    );
                    //add the refresh token to the user.
                }
            })
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
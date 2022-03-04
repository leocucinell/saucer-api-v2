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
            const comparedPass = await bcrypt.compare(req.body.password, clientExistsCheck.password, async (err, result) => {
                if(err){
                    res.status(400).json({
                        message: 'Unable to compare passwords, please try again'
                    });
                }
                else if (!result) {
                    res.status(401).json({
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
                    const updatedUser = await prisma.customer.update({
                        where: {
                            username: req.body.username
                        },
                        data: {
                            refreshToken
                        }
                    });
                    res.status(200).json({
                        message: 'User logged in!',
                        accessToken,
                        refreshToken,
                        userData: updatedUser
                    });
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

const logout_user = async (req, res) => {
    try{
        console.log(req)
        const updateUser = await prisma.customer.update({
            where: {
                username: req.body.username
            },
            data: {
                refreshToken: ''
            }
        });
        res.status(200).json({
            message: 'successfully logged user out.'
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "Error logging user out"
        });
    }
}

const validateRefresh = async (req, res) => {
    const token = req.query.refreshToken;
    const validated = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        try {
            if(err){
                console.log(err);
                res.status(400).json({
                    message: "Error validating refresh token"
                });
            }
            //token has been decoded
            //issue new access & refresh token to the user 
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            const refreshToken = jwt.sign(
                {"username": decoded.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1w'}
            );
            //Update the refresh token for the user with that username
            const updateRefresh = await prisma.customer.update({
                where: {
                    id: parseInt(req.query.id)
                },
                data: {
                    refreshToken: refreshToken
                }
            });
            const userResponse = {
                id: updateRefresh.id,
                username: updateRefresh.username,
                email: updateRefresh.email,
                phoneNumber: updateRefresh.phoneNumber,
                refreshToken: updateRefresh.refreshToken,
                accessToken: accessToken
            }
            res.status(200).json({
                message: 'Success!',
                data: userResponse
            });
        } catch (err) {
            console.log('ERROR VALIDATING DATA')
            console.log(err)
            res.status(400).json({
                message: "error validating data"
            });
        }
    });
}

//SECTION: Exports
module.exports = {
    login_user,
    logout_user,
    validateRefresh
}
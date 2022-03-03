/*
    This file contains all API route methods pertaining to customers
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

//SECTION: Related methods
const create_user = async (req, res) => {
    //Create a user with the provided data
    try {
        //check if user already exists
        const userCheck = await prisma.customer.findUnique({
            where: {
                username: req.body.username
            }
        });
        const emailCheck = await prisma.customer.findUnique({
            where: {
                email: req.body.email
            }
        });
        if(userCheck || emailCheck){
            res.status(400).json({
                message: "User with that email or password already exist"
            });
        } else {
            const hashedPass = bcrypt.hash(req.body.password, 10, async (err, result) => {
                const createdUser = await prisma.customer.create({
                    data: {
                        username: req.body.username,
                        email: req.body.email,
                        password: result,
                        phoneNumber: req.body.phoneNumber
                    }
                });
            });
            res.status(200).json({
                message: 'User created, continue to login'
            });
        }
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: 'error creating user, please try again!'
        })
    }
}

const retrieve_user = async (req, res) => {
    try {
        const foundUser = await prisma.customer.findUnique({
            where: {
                id: req.body.userId
            }
        });
        console.log(foundUser);
        res.status(200).json({
            message: 'Found User!',
            userData: foundUser
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "error retrieving user"
        })
    }
}

const update_user = async (req, res) => {
    try {
        const updatedUser = await prisma.customer.update({
            where: {
                id: req.body.id
            },
            data: {
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
            }
        });
        
        const userResponse = {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            refreshToken: updatedUser.refreshToken
        }
        res.status(200).json({
            message: 'Updated User!',
            userData: userResponse
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "error updating user"
        })
    }
}

//SECTION: Exports
module.exports = {
    create_user,
    retrieve_user,
    update_user
}
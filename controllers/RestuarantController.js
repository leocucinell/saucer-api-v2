/*
    This file contains all API route methods pertaining to restuarants
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

//SECTION: Related methods
const retrieve_city_restuarant_list = async (req, res) => {
    try{
        const cityRestuarants = await prisma.city.findUnique({
            where: {
                id: parseInt(req.query.id)
            },
            select: {
                restuarants_list: true
            }
        });
        res.status(200).json({
            message: 'Success!',
            data: cityRestuarants
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "error retrieving city restuarant list"
        });
    }
}

const retrieve_restuarant = (req, res) => {
    res.send('Retrieve single restuarant');
}

const create_restuarant = async (req, res) => {
    
    //create a new resturaunt
    //add the resturaunt to the user
    try {
        //check if a user exists:
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
                message: 'User with that username or password already exists'
            });
        } else {
            const hashPass = bcrypt.hash(req.body.password, 10, async (err, result) => {
                if(err){
                    res.status(400).json({
                        message: 'Unable to hash password'
                    });
                }
                //create a new user
                const newUser = await prisma.customer.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: result,
                    phoneNumber: req.body.phoneNumber
                });
                //create a new resturaunt
                const newRestuarant = await prisma.restuarant.create({
                    owner: newUser, //NOTE: Do I add the user id instead of the actaul user?
                    username: req.body.username,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    title: req.body.title,
                    description: req.body.description,
                    Location: req.body.location,
                    menuUrl: req.body.menuUrl, //NOTE: Change to upload image to s3 then write here
                    bannerUrl: req.body.bannerUrl, //NOTE: Change to upload to s3 then write here
                    resPerHour: req.body.resPerHour,
                    hourOpen: req.body.hourOpen,
                    hourClose: req.body.hourClose,
                    password: result,
                    city_id: req.body.cityId //NOTE: Check if this id will connect to a city in db
                });
                //add them together... Accomplished above?
            });
        }
        //create a new user
        const hashPass = bcrypt.hash()
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: 'Error creating restuarant'
        });
    }
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
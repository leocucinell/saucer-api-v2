/*
    This file contains all API route methods pertaining to reservations
*/
//SECTION: Requires
const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const prisma = new PrismaClient()

//SECTION: Related methods
const retrieve_reservation = (req, res) => {
    res.send('Get Reservation');
}

const retrieve_user_reservations = async (req, res) => {
    try{
        const userReservations = await prisma.customer.findUnique({
            where: {
                id: parseInt(req.query.id)
            },
            select: {
                reservations: true
            }
        });
        res.status(200).json({
            message: 'Success',
            data: userReservations
        });

    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "Error retrieving user reservations"
        });
    }
}

const retrieve_restuarant_reservations = async (req, res) => {
    //retrieves a restuarant and includes all reservations
    try{
        const userReservations = await prisma.restuarant.findUnique({
            where: {
                id: parseInt(req.query.id)
            },
            select: {
                reservations: true
            }
        });
        res.status(200).json({
            message: 'Success',
            data: userReservations
        });

    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: "Error retrieving restuarant reservations"
        });
    }
}

const add_reservation = async (req, res) => {
    try{
        //create the reservation and set the owner_id & resturaunt_id
        const createdReservation = await prisma.reservation.create({
            //TODO: Change the data object to match new schema
            data: {
                startTime: req.body.startTime,
                owner_id: req.body.owner_id,
                restuarant_id: parseInt(req.body.restuarant_id),
                title: req.body.title,
                description: req.body.description,
                date: req.body.date
            }
        });
        res.status(200).json({
            message: 'success',
            data: createdReservation
        });

    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: 'Error adding reservation'
        })
    }
}

const delete_reservation = async (req, res) => {
    try{
        const deletedReservation = await prisma.reservation.delete({
            where: {
                id: req.body.id
            }
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: 'Error deleting reservation'
        })
    }
}

//SECTION: Exports
module.exports = {
    retrieve_reservation,
    retrieve_user_reservations,
    add_reservation,
    delete_reservation,
    retrieve_restuarant_reservations
}
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Appointment');
const Appointment = require('../models/Appointment');

//Get all appointments
router.route('/').get((req, res) => {
    Doctor.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json('Error:' +err));
});


router.route('/add')
.post((req, res) => {
    const { patientName, doctorName, date } = req.body;

    const newAppointment = 
    new Appointment({patientName, doctorName, date});

    newAppointment.save()
    //Return the saved Appointment object
    .then(savedAppointment => res.json(savedAppointment))
    .catch(err => res.status(400).json('Error:' +err));
});


//updated doctor data
router.route('/update/:id')
.post((req, res) => {
    Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;
        appointment.save()
        .then(() => res.json('Appointment update!'))
        .catch(err => res.status(400).json('Error:' +err));
    })
    .catch(err => res.status(400).json('Error:' +err));
});

//delete appointment

router.route('./delete/:id')
    .delete((req, res) => {
        Appointment.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('Appointment deleted')
        })
        .catch(err => res.status(400).json('Error:' +err));
    });

    module.exports = router;
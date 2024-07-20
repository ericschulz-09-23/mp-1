const mongoose = require('mongoose');
const router = express.Router();
const Doctor = require('../models/Doctor');

//Get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
    .then(doctor => res.json(doctors))
    .catch(err => res.status(400).json('Error:' +err));
});


router.route('/add')
.post((req, res) => {
    const { name, specialty } = req.body;

    const newDoctor = new Doctor({name, specialty});

    newDoctor.save()
    //Return the saved Doctor object
    .then(savedDoctor => res.json(savedDoctor))
    .catch(err => res.status(400).json('Error:' +err));
});


//updated doctor data
router.route('/update/:id')
.post((req, res) => {
    Doctor.findById(req.params.id)
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json('Doctor not found');
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        doctor.save()
        .then(() => res.json('Doctor update!'))
        .catch(err => res.status(400).json('Error:' +err));
    })
    .catch(err => res.status(400).json('Error:' +err));
});

//delete doctor by ID

router.route('./delete/:id')
    .delete((req, res) => {
        Patient.findByIdAndDelete(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json('Doctor not found');
            }
            res.json('Doctor deleted');
        })
        .catch(err => res.status(400).json('Error:' +err));
    });

    module.exports = router;

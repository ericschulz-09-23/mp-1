const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cor());
app.use(bodyParser.json());

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection dstablished successfully');
});

app.use('/patients', patientsRouter);
app.use('/doctor', doctorRouter);
app.use('/appointments', appointmentsRouter);

app.listen(PORT, ()=> {
    console.log(`Aerver is running on port ${PORT}`);
});
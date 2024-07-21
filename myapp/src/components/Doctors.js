import React, { useState, useEffect } from "react";
import axios from 'axios';
import DoctorCard from './DoctorCard';
import './Doctors.css'

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: ''
    });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleAddDoctor = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/doctors/add', newDoctor)
            .then(response => {
                console.log('doc', response.data);
                setDoctors([
                    ...doctors,
                    response.data
                ]);
                setNewDoctor({
                    name: '',
                    specialty: ''
                });
            })
            .catch(error =>
                console.error('Error adding doctor:', error)
            );
    };

    const handleUpdateDoctor = (id, e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
            .then(response => {
                const updateDoc = {
                    ...selectedDoctor,
                    _id: id
                };

                console.log('update doc', updateDoc);

                setDoctors(
                    doctors.map(
                        doctor => (doctor._id === id ? updateDoc : doctor)
                    )
                );

                setSelectedDoctor(null);
                setIsEditMode(false); //Switched back to Add mode
            })
            .catch(error => console.error('Error updating doctor:', error));
    };

    const handleDeleteDoctor = (id) => {
        axios
            .delete(`http://localhost:5000/doctors/delete/${id}`)
            .then(response => {
                console.log(response.data);
                setDoctors(doctors.filter(doctor => doctor._id));
            })
            .catch(error => console.error('Error deleting doctor:', error));
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditMode(true); //Switch to Edit mode
    };

    return (
        <div className="main-doc-container">
            <div className="form-sections">
                <h4>{
                    isEditMode ?
                        'Edit doctor' :
                        'Add New doctor'
                }</h4>
                <form onSubmit={
                    isEditMode ?
                        (e) =>  handleUpdateDoctor(selectedDoctor._id, e) :
                        handleAddDoctor}>
                    <label>Name:</label>
                    <input type="text"
                        value={
                            isEditMode ?
                                selectedDoctor.name :
                                newDoctor.name
                        }
                        onChange={(e) =>
                            isEditMode ?
                                setSelectedDoctor({
                                    ...selectedDoctor,
                                    name: e.target.value
                                }) :
                                setNewDoctor({
                                    ...newDoctor,
                                    name: e.target.value
                                })
                        } />
                    <br />
                    <label>Specialty:</label>
                    <input type="text"
                        value={
                            isEditMode ?
                                selectedDoctor.specialty :
                                newDoctor.specialty
                        }
                        onChange={(e) =>
                            isEditMode ?
                                setSelectedDoctor({
                                    ...selectedDoctor,
                                    specialty: e.target.value
                                }) :
                                setNewDoctor({
                                    ...newDoctor,
                                    specialty: e.target.value
                                })
                        }
                    />
                    <br />
                    <button type="submit">
                        {isEditMode ?
                       'Update Doctor' :
                       'Add Doctor'    
                    }</button>
                </form>
            </div>
            <div className="doctors-section">
                <h3>Doctors({doctors.length})</h3>
                <div className="doctor-list">
                    {doctors.map(doctor => (
                        <DoctorCard 
                        key ={doctor._id}
                        doctor={doctor}
                        onEdit={handleEditDoctor}
                        onDelete={handleDeleteDoctor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Doctors;
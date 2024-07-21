import React from "react";

const PatientCard = (
    {
        patient, onEdit, onDelete
    }
) => {
    return(
        <div className="patient-card">
            <h4>{patient.name}</h4>
            <p>Geneder: {patient.gender}</p>
            <div className="btn-container" 
            style={{width: '100%'}}>
                <button onClick={() => onEdit(patient)}>Edit</button>
                <button onClick={() => onDelete(patient)}>Delete</button>

            </div>
        </div>
    );
};

export default PatientCard;
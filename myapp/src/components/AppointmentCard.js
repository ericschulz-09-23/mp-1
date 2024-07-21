import React from 'react';
 
const AppointmentCard =
    (
        {
            appointment,
            onEdit,
            onDelete
        }
    ) => {
        return (
            <div
                className="appointment-card">
                <p>
                    <span>
                        Patient:
                    </span>
                    {appointment.patientName}
                </p>
                <p>
                    <span>
                        Doctor:
                    </span>
                    {appointment.doctorName}</p>
                <p>
                    <span>
                        Date:
                    </span>
                    {
                        new Date(appointment.date)
                            .toLocaleDateString()
                    }
                </p>
                <div className='btn-container'>
                    <button onClick={
                        () =>
                            onEdit(appointment)
                    }>
                        Edit
                    </button>
                    <button onClick={
                        () =>
                            onDelete(appointment._id)
                    }>
                        Delete
                    </button>
                </div>
 
            </div>
        );
    };
 
export default AppointmentCard;
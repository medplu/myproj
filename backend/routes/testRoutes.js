import express from 'express';
import fetch from 'node-fetch';
import appointmentController from '../controllers/appointment.controller.js';

const router = express.Router();

// Destructure the functions from appointmentController
const {
  createAppointment,
  getAppointments,
  getNewAppointmentsCount,
  getAllAppointments,
  resetNewAppointmentsCount,
  confirmAppointment,
  getUserAppointments
} = appointmentController(); // Assuming appointmentController does not require 'io'

// Test route to make requests to appointment endpoints
router.get('/test', async (req, res) => {
  try {
    // Example of making a request to create an appointment
    const appointmentData = {
      doctorId: 'doctor_id_here',
      date: '2024-07-07',
      time: '10:00 AM'
    };
    const newAppointmentResponse = await fetch('http://localhost:3000/api/appointments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…U3M30.QUdqUE1SUk2Ddo3SVeBtniTZtR0Sa0Gdd1qG00dGy9g` // Replace with your actual JWT token
      },
      body: JSON.stringify(appointmentData)
    });
    const newAppointment = await newAppointmentResponse.json();
    console.log('New appointment created:', newAppointment);

    // Example of making a request to get all appointments for a specific doctor
    const doctorId = 'doctor_id_here';
    const allAppointmentsResponse = await fetch(`http://localhost:3000/api/appointments/all/${doctorId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…U3M30.QUdqUE1SUk2Ddo3SVeBtniTZtR0Sa0Gdd1qG00dGy9g` // Replace with your actual JWT token
      }
    });
    const allAppointments = await allAppointmentsResponse.json();
    console.log('All appointments for doctor:', allAppointments);

    // Add more requests as needed for other endpoints

    res.status(200).send('Test route executed successfully');
  } catch (error) {
    console.error('Error in test route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

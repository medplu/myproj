import express from 'express';
import {
  createAppointment,
  getAppointments,
  getNewAppointmentsCount,
  getUserAppointments, // Import the getUserAppointments function
  getAllAppointments,
  resetNewAppointmentsCount,
  confirmAppointment // Import the confirmAppointment function
} from '../controllers/appointment.controller.js';

const router = express.Router();

// Route to create a new appointment
router.post('/', createAppointment);

// Route to get all appointments for a specific doctor
router.get('/:doctorId', getAppointments);

router.get('/all/:doctorId', getAllAppointments);

//Route to appointments for a patient 
router.get('/user/:userId', getUserAppointments);


// Route to get new appointments count
router.get('/new/count/:doctorId', getNewAppointmentsCount);

// Route to reset new appointments count
router.post('/new/reset/:doctorId', resetNewAppointmentsCount);

// Route to confirm an appointment
router.post('/confirm/:id', confirmAppointment); // Add this line

export default router;

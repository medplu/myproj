import express from 'express';
import appointmentController from '../controllers/appointment.controller.js';

export default function(io) {
  const router = express.Router();

  const {
    createAppointment,
    getAppointments,
    getNewAppointmentsCount,
    getAllAppointments,
    resetNewAppointmentsCount,
    confirmAppointment,
    getUserAppointments
  } = appointmentController(io);

  // Route to create a new appointment
  router.post('/', createAppointment);
// Route to book an appointment and update the doctor's schedule

  // Route to get all appointments for a specific doctor
  router.get('/:doctorId', getAppointments);

  router.get('/all/:doctorId', getAppointments);

  router.get('/user/:userId', getUserAppointments);

  // Route to get new appointments count
  router.get('/new/count/:doctorId', getNewAppointmentsCount);

  // Route to reset new appointments count
  router.post('/new/reset/:doctorId', resetNewAppointmentsCount);

  // Route to confirm an appointment
  router.post('/confirm/:id', confirmAppointment);

  return router;
}
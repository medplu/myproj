import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointment.controller.js';

const router = express.Router();

// Route to create a new appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/:doctorId', getAppointments);

export default router;

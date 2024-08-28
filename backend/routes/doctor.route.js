import express from 'express';
import {
  getDoctor,
  updateDoctorSchedule,
  fetchSchedule,
  DoctorList,
  updateDoctor,
  updateConsultationFee // Import the new function
} from '../controllers/doctor.controller.js';

const router = express.Router();

// Route to set or update doctor's schedule
router.put('/:userId/schedule', updateDoctorSchedule);

// Route to fetch doctor's schedule
router.get('/:userId/schedule', fetchSchedule);

// Route to get a single doctor by doctorId
router.get('/:doctorId', getDoctor);

// Route to update a doctor's information by doctorId
router.put('/:doctorId', updateDoctor);

// Route to update a doctor's consultation fee by doctorId
router.patch('/:doctorId/consultation-fee', updateConsultationFee); // New route

// Route to fetch list of doctors
router.get('/', DoctorList);

export default router;

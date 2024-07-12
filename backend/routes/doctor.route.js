// routes/doctor.route.js

import express from 'express';
import {
  getDoctor,
  updateDoctorSchedule,
  fetchSchedule,
  DoctorList,
  updateDoctor,
  updateDoctorInfo,
  updateDoctorAvailability,
  updateConsultationFee,
  updateClinicLocation
} from '../controllers/doctor.controller.js';

const router = express.Router();

// Route to set or update doctor's schedule
router.put('/:userId/schedule', updateDoctorSchedule);

// Route to fetch doctor's schedule
router.get('/:userId/schedule', fetchSchedule);

// Route to get a single doctor by ID
router.get('/:doctorId', getDoctor);

// Route to update a doctor's information
router.put('/:doctorId', updateDoctor);

// Route to update doctor's bio and image
router.put('/:doctorId/updateInfo', updateDoctorInfo);

// Route to update doctor's availability
router.put('/:doctorId/availability', updateDoctorAvailability);

// Route to update doctor's consultation fee
router.put('/:doctorId/consultationFee', updateConsultationFee);

// Route to update doctor's clinic location
router.put('/:doctorId/clinicLocation', updateClinicLocation);

// Route to get list of all doctors
router.get('/', DoctorList);

export default router;

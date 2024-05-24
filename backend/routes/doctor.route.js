// routes/doctor.route.js

import express from 'express';
import { getDoctor, updateDoctorSchedule, fetchSchedule, DoctorList } from '../controllers/doctor.controller.js';


const router = express.Router();


// Route to set or update doctor's schedule
router.put('/:userId/schedule', updateDoctorSchedule);

// Route to fetch doctor's schedule
router.get('/:userId/schedule', fetchSchedule);

router.get('/:id', getDoctor)



router.get('/', DoctorList);

export default router;

import express from 'express';
import { createOrUpdateSchedule, getSchedule, getLastScheduledDay } from '../controllers/schedule.controller.js';

const router = express.Router();

// Create or Update Schedule
router.post('/:doctorId', createOrUpdateSchedule);

// Get Doctor's Schedule
router.get('/:doctorId', getSchedule);

// Get Last Scheduled Day
router.get('/last/:doctorId', getLastScheduledDay);

export default router;

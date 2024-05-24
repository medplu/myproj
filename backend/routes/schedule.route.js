import express from 'express';
import { createOrUpdateSchedule, getSchedule } from '../controllers/schedule.controller.js';    
const router = express.Router();


// Create or Update Schedule
router.post('/:userId', createOrUpdateSchedule);

// Get Doctor's Schedule
router.get('/:userId', getSchedule);

export default router;

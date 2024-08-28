import express from 'express';
import {
  createOrUpdateSchedule,
  getScheduleByDay,
  getAllSchedules,
  getLastScheduledDay,
  getAvailableSlots,
  bookSlot,
  cancelSlot
} from '../controllers/schedule.controller.js';

const router = express.Router();

// Create or Update Schedule
router.post('/:doctorId', createOrUpdateSchedule);

// Get Doctor's Schedule for a specific day
router.get('/:doctorId/:day', getScheduleByDay);

// Get All Schedules for a Doctor
router.get('/:doctorId/all', getAllSchedules);

// Get Last Scheduled Day with available slots
router.get('/last/:doctorId', getLastScheduledDay);

// Get Available Slots for Booking
router.get('/:doctorId/:day/available', getAvailableSlots);

// Book a Slot
router.post('/:doctorId/:day/slot/:slotId/book', bookSlot);

// Cancel a Booked Slot
router.post('/:doctorId/:day/slot/:slotId/cancel', cancelSlot);

export default router;

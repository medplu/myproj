import express from 'express';
import appointmentController from '../controllers/appointment.controller.js';
import { protectRoute } from '../middleware/protectRoute.js'; // Assuming the middleware is named authMiddleware.js

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

  // Apply protectRoute middleware to secure routes
  router.post('/', protectRoute, createAppointment);

  // Protecting routes that require authenticated users
  router.get('/:doctorId', protectRoute, getAllAppointments);
  router.get('/all/:doctorId', protectRoute, getAppointments);
  router.get('/user/:userId', protectRoute, getUserAppointments);
  router.get('/new/count/:doctorId', protectRoute, getNewAppointmentsCount);
  router.post('/new/reset/:doctorId', protectRoute, resetNewAppointmentsCount);
  router.post('/confirm/:id', protectRoute, confirmAppointment);

  return router;
}

// routes/appointment.route.js

import {
  createAppointment,
  getAppointments,
  getAllAppointments,
  getNewAppointmentsCount,
  resetNewAppointmentsCount,
  confirmAppointment,
  getUserAppointments,
} from '../controllers/appointment.controller.js';

// Define your routes and use the imported controller functions
// For example:
router.post('/appointments', createAppointment);
router.get('/appointments/doctor/:doctorId', getAppointments);
router.get('/appointments/doctor/all/:doctorId', getAllAppointments);
router.get('/appointments/doctor/new/count/:doctorId', getNewAppointmentsCount);
router.put('/appointments/doctor/reset/new/count/:doctorId', resetNewAppointmentsCount);
router.put('/appointments/confirm/:id', confirmAppointment);
router.get('/appointments/user/:userId', getUserAppointments);

export default router;

import Appointment from '../models/appointment.model.js';
import User from '../models/user.model.js';
import { createError } from './error.js';

export default function (io) {
  return {
    createAppointment: async (req, res) => {
      const { name, phone, email, gender, age, date, doctorId, time } = req.body;
      const userId = req.user._id; // Assuming req.user._id is set by JWT middleware

      // Check required fields
      if (!name || !phone || !email || !gender || !age || !date || !doctorId || !time) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
        const existingAppointment = await Appointment.findOne({ doctor_id: doctorId, user_id: userId, Date: date });
        if (existingAppointment) {
          return res.status(400).json({ message: 'An appointment already exists for this doctor, user, and date' });
        }

        const appointment = new Appointment({
          name,
          phone,
          email,
          gender,
          age,
          Date: date,
          doctor_id: doctorId,
          user_id: userId,
          time,
          status: 'new'
        });

        await appointment.save();

        io.emit('newAppointment', appointment);

        res.status(201).json(appointment);
      } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Server error' });
      }
    },

    getAppointments: async (req, res) => {
      const userId = req.user._id; // Assuming req.user._id is set by JWT middleware

      try {
        const appointments = await Appointment.find({ user_id: userId });

        res.status(200).json({
          success: true,
          count: appointments.length,
          data: appointments,
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    },

    getAllAppointments: async (req, res) => {
      const { doctorId } = req.params;

      try {
        const appointments = await Appointment.find({ doctor_id: doctorId });

        res.status(200).json({
          success: true,
          count: appointments.length,
          data: appointments,
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    },

    getUserAppointments: async (req, res) => {
      const { userId } = req.params;

      try {
        const appointments = await Appointment.find({ user_id: userId })
          .populate('doctor_id', 'name specialties experience image');

        res.status(200).json({
          success: true,
          count: appointments.length,
          data: appointments,
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    },

    getNewAppointmentsCount: async (req, res) => {
      const { doctorId } = req.params;

      try {
        const count = await Appointment.countDocuments({ doctor_id: doctorId, status: 'new' });
        res.status(200).json({ count });
      } catch (error) {
        console.error('Error fetching new appointments count:', error);
        res.status(500).json({ message: 'Server error' });
      }
    },

    resetNewAppointmentsCount: async (req, res) => {
      const { doctorId } = req.params;

      try {
        await Appointment.updateMany({ doctor_id: doctorId, status: 'new' }, { status: 'viewed' });
        res.status(200).json({ message: 'New appointments count reset successfully' });
      } catch (error) {
        console.error('Error resetting new appointments count:', error);
        res.status(500).json({ message: 'Server error' });
      }
    },

    confirmAppointment: async (req, res) => {
      const { id } = req.params;
      const { time } = req.body;

      try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = 'confirmed';
        appointment.time = time;
        await appointment.save();

        io.emit('appointmentConfirmed', appointment);

        res.status(200).json({ message: 'Appointment confirmed', appointment });
      } catch (error) {
        console.error('Error confirming appointment:', error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  };
}

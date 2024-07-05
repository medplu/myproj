// controllers/appointment.controller.js

import Appointment from '../models/appointment.model.js';

// Controller to create a new appointment
export const createAppointment = async (req, res) => {
  const { name, phone, email, gender, age, Date, doctorId, userId } = req.body;

  // Check each field individually except for Date
  if (!name) return res.status(400).json({ message: 'Missing name field' });
  if (!phone) return res.status(400).json({ message: 'Missing phone field' });
  if (!email) return res.status(400).json({ message: 'Missing email field' });
  if (!gender) return res.status(400).json({ message: 'Missing gender field' });
  if (!age) return res.status(400).json({ message: 'Missing age field' });
  if (!doctorId) return res.status(400).json({ message: 'Missing doctorId field' });
  if (!userId) return res.status(400).json({ message: 'Missing userId field' });

  try {
    const appointment = new Appointment({
      name,
      phone,
      email,
      gender,
      age,
      Date, // Optional field
      doctor_id: doctorId,
      user_id: userId,
      status: 'new' // Default status
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller to get all appointments for a specific doctor
export const getAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params; // Get doctorId from request parameters

    const appointments = await Appointment.find({ doctor_id: doctorId, status: { $ne: 'confirmed' } });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params; // Get doctorId from request parameters

    const appointments = await Appointment.find({ doctor_id: doctorId });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller to get new appointments count for a specific doctor
export const getNewAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const count = await Appointment.countDocuments({ doctor_id: doctorId, status: 'new' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new appointments count', error });
  }
};

// Controller to reset new appointments count for a specific doctor
export const resetNewAppointmentsCount = async (req, res) => {
  const { doctorId } = req.params;
  try {
    await Appointment.updateMany({ doctor_id: doctorId, status: 'new' }, { status: 'viewed' });
    res.status(200).json({ message: 'New appointments count reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting new appointments count', error });
  }
};

// Controller to confirm an appointment
export const confirmAppointment = async (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'confirmed';
    appointment.time = time; // Assuming you have a 'time' field in your schema
    await appointment.save();

    res.status(200).json({ message: 'Appointment confirmed', appointment });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

import Appointment from '../models/appointment.model.js';

import Doctor from '../models/doctor.model.js'
export default function (io) {
  return {
    // Controller to create a new appointment
    // Controller to create a new appointment
// Controller to create a new appointment
createAppointment: async (req, res) => {
  const { name, phone, email, gender, age, date, doctorId, userId, time } = req.body;

  // Check each field individually
  if (!name) return res.status(400).json({ message: 'Missing name field' });
  if (!phone) return res.status(400).json({ message: 'Missing phone field' });
  if (!email) return res.status(400).json({ message: 'Missing email field' });
  if (!gender) return res.status(400).json({ message: 'Missing gender field' });
  if (!age) return res.status(400).json({ message: 'Missing age field' });
  if (!date) return res.status(400).json({ message: 'Missing date field' });
  if (!doctorId) return res.status(400).json({ message: 'Missing doctorId field' });
  if (!userId) return res.status(400).json({ message: 'Missing userId field' });
  if (!time) return res.status(400).json({ message: 'Missing time field' });

  try {
    const existingAppointment = await Appointment.findOne({ doctor_id: doctorId, user_id: userId, Date: date });
    if (existingAppointment) {
      // Redirect user to appointments page if an appointment already exists for the same doctor, user, and date
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
      status: 'new' // Add status field with default value 'new'
    });

    await appointment.save();

    

    // Emit an event to all connected clients
    io.emit('newAppointment', appointment);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
},

    // Controller to get all appointments for a specific doctor
    getAppointments: async (req, res) => {
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
    },

    // Controller to get all appointments for a specific doctor
    getAllAppointments: async (req, res) => {
      try {
        const { doctorId } = req.params;
        console.log('Doctor ID:', doctorId); // Add this line for debugging
        
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
    },

    // Controller to get all appointments for a specific user
    getUserAppointments: async (req, res) => {
      try {
        const { userId } = req.params; // Get userId from request parameters

        const appointments = await Appointment.find({ user_id: userId })
          .populate('doctor_id', 'name specialties experience image') // Include doctor's details
          .exec();

        res.status(200).json({
          success: true,
          count: appointments.length,
          data: appointments,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    },

    // Controller to get new appointments count for a specific doctor
    getNewAppointmentsCount: async (req, res) => {
      const { doctorId } = req.params;
      try {
        const count = await Appointment.countDocuments({ doctor_id: doctorId, status: 'new' });
        res.status(200).json({ count });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching new appointments count', error });
      }
    },

    // Controller to reset new appointments count for a specific doctor
    resetNewAppointmentsCount: async (req, res) => {
      const { doctorId } = req.params;
      try {
        await Appointment.updateMany({ doctor_id: doctorId, status: 'new' }, { status: 'viewed' });
        res.status(200).json({ message: 'New appointments count reset successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error resetting new appointments count', error });
      }
    },

 // Controller to confirm an appointment
confirmAppointment: async (req, res) => {
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

    // Emit an event to all connected clients
    io.emit('appointmentConfirmed', appointment);

    res.status(200).json({ message: 'Appointment confirmed', appointment });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

}
  }

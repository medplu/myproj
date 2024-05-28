

// Controller to create a new appointment
import Appointment from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
  const { name, phone, email, gender, age, Date, doctorId, userId } = req.body;

  // Check each field individually
  if (!name) return res.status(400).json({ message: 'Missing name field' });
  if (!phone) return res.status(400).json({ message: 'Missing phone field' });
  if (!email) return res.status(400).json({ message: 'Missing email field' });
  if (!gender) return res.status(400).json({ message: 'Missing gender field' });
  if (!age) return res.status(400).json({ message: 'Missing age field' });
  if (!Date) return res.status(400).json({ message: 'Missing Date field' });
  if (!doctorId) return res.status(400).json({ message: 'Missing doctorId field' });
  if (!userId) return res.status(400).json({ message: 'Missing userId field' });

  try {
    const appointment = new Appointment({
      name,
      phone,
      email,
      gender,
      age,
      Date,
      doctor_id: doctorId,
      user_id: userId,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller to get all appointments
// Controller to get all appointments for a specific doctor
export const getAppointments = async (req, res) => {
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

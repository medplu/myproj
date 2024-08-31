import Doctor from '../models/doctor.model.js';


export const createOrUpdateSchedule = async (req, res) => {
  const { doctorId } = req.params;
  const { day, timeSlots } = req.body;

  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (!day || !timeSlots || !Array.isArray(timeSlots)) {
    return res.status(400).json({ message: 'Invalid input: day and timeSlots are required' });
  }

  if (!validDays.includes(day)) {
    return res.status(400).json({ message: 'Invalid day provided' });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update the schedule for the specified day
    doctor.schedule[day] = timeSlots.map(slot => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked || false,
      patientId: slot.patientId || null
    }));

    await doctor.save();
    res.json({ message: 'Schedule updated successfully', schedule: doctor.schedule });
  } catch (error) {
    console.error('Error creating or updating schedule:', error);
    res.status(500).json({ message: 'Server error while creating or updating schedule' });
  }
};
// Get schedule for a specific day
export const getScheduleByDay = async (req, res) => {
  const { doctorId, day } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctor.schedule[day]) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    res.json(doctor.schedule[day]);
  } catch (error) {
    console.error('Error retrieving schedule by day:', error);
    res.status(500).json({ message: 'Server error while retrieving schedule by day' });
  }
};

// Get the entire schedule
export const getAllSchedules = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor.schedule);
  } catch (error) {
    console.error('Error retrieving all schedules:', error);
    res.status(500).json({ message: 'Server error while retrieving all schedules' });
  }
};

// Get the last scheduled day with available slots
export const getLastScheduledDay = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const lastScheduledDay = days.reverse().find(day => doctor.schedule[day].some(slot => !slot.isBooked));

    res.json({ lastScheduledDay: lastScheduledDay || 'No schedule found' });
  } catch (error) {
    console.error('Error retrieving last scheduled day:', error);
    res.status(500).json({ message: 'Server error while retrieving last scheduled day' });
  }
};

// Get available slots for booking (i.e., not booked)
export const getAvailableSlots = async (req, res) => {
  const { doctorId, day } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctor.schedule[day]) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    const availableSlots = doctor.schedule[day].filter(slot => !slot.isBooked);

    res.json(availableSlots);
  } catch (error) {
    console.error('Error retrieving available slots:', error);
    res.status(500).json({ message: 'Server error while retrieving available slots' });
  }
};

// Book a slot for a patient
export const bookSlot = async (req, res) => {
  const { doctorId, day, slotId } = req.params;
  const { patientId } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctor.schedule[day]) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    const slot = doctor.schedule[day].find(slot => slot._id.toString() === slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    slot.isBooked = true;
    slot.patientId = patientId;

    await doctor.save();
    res.json(slot);
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Server error while booking slot' });
  }
};

// Cancel a booked slot
export const cancelSlot = async (req, res) => {
  const { doctorId, day, slotId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctor.schedule[day]) {
      return res.status(400).json({ message: 'Invalid day' });
    }

    const slot = doctor.schedule[day].find(slot => slot._id.toString() === slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (!slot.isBooked) {
      return res.status(400).json({ message: 'Slot is not booked' });
    }

    slot.isBooked = false;
    slot.patientId = null;

    await doctor.save();
    res.json(slot);
  } catch (error) {
    console.error('Error canceling slot:', error);
    res.status(500).json({ message: 'Server error while canceling slot' });
  }
};

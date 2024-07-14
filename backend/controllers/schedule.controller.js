import Schedule from '../models/schedule.model.js';
import Doctor from '../models/doctor.model.js';

export const createOrUpdateSchedule = async (req, res) => {
  const { doctorId } = req.params;
  const { day, date, totalSlots } = req.body;

  if (!day || !date || !totalSlots) {
    return res.status(400).json({ message: 'Invalid day, date, or total slots' });
  }

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if a schedule already exists for the given day and date
    let schedule = await Schedule.findOne({ doctor: doctor._id, day, date });

    if (schedule) {
      // If schedule exists, update totalSlots
      schedule.totalSlots = totalSlots;
    } else {
      // If schedule does not exist, create a new schedule
      schedule = new Schedule({ doctor: doctor._id, day, date, totalSlots });
    }

    await schedule.save();

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getSchedule = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const schedules = await Schedule.find({ doctor: doctor._id }).sort({ date: 1 });

    if (!schedules.length) {
      return res.status(200).json({ message: 'No schedules found for this doctor' });
    }

    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLastScheduledDay = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const lastSchedule = await Schedule.findOne({ doctor: doctor._id }).sort({ date: -1 });

    if (!lastSchedule) {
      return res.status(200).json({ lastScheduledDate: new Date() });
    }

    res.json({ lastScheduledDate: lastSchedule.date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

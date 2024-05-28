import Schedule from '../models/schedule.model.js';
import Doctor from '../models/doctor.model.js';

export const createOrUpdateSchedule = async (req, res) => {
  const { doctorId } = req.params; // This is actually the userId
  const { day, date, slots } = req.body;

  if (!day || !date || !slots || !Array.isArray(slots) || slots.length === 0) {
    return res.status(400).json({ message: 'Invalid day, date or slots' });
  }

  try {
    console.log('Received doctorId (userId):', doctorId); // Debugging line

    const doctor = await Doctor.findOne({ userId: doctorId });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    let schedule = await Schedule.findOne({ doctor: doctor._id, day, date });

    if (schedule) {
      schedule.slots = slots;
    } else {
      schedule = new Schedule({ doctor: doctor._id, day, date, slots });
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
    const doctor = await Doctor.findOne({userId: doctorId});

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const schedules = await Schedule.find({ doctor: doctor._id });

    if (!schedules.length) {
      return res.status(404).json({ message: 'Schedules not found' });
    }

    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

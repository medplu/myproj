import Schedule from '../models/schedule.model.js';
import Doctor from '../models/doctor.model.js';

export const createOrUpdateSchedule = async (req, res) => {
  const { userId } = req.params; // Changed from req.params to req.body
  const { day, slots } = req.body;

  try {
    const doctor = await Doctor.findOne({ userId }); // Changed from findById to findOne

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    let schedule = await Schedule.findOne({ doctor: userId, day });

    if (schedule) {
      // Update existing schedule
      schedule.slots = slots;
    } else {
      // Create new schedule
      schedule = new Schedule({ doctor: userId, day, slots });
    }

    await schedule.save();

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSchedule = async (req, res) => {
  const { userId } = req.params;

  try {
    const schedules = await Schedule.find({ doctor: userId });
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

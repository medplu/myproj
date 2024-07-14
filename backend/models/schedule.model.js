import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  day: { type: String, required: true }, // Example: 'Monday'
  date: { type: Date, required: true },
  totalSlots: { type: Number, required: true }, // Total slots available for the day
  bookedSlots: { type: Number, default: 0 } // Number of slots that have been booked
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;

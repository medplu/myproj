import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  slots: [
    {
      time: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
    },
  ],
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;

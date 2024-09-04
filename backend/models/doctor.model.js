import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  isBooked: { type: Boolean, default: false },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  isBooked: { type: Boolean, default: false },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
});

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  experience: {
    type: String,
    default: null,
  },
  specialties: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  consultationFee: {
    type: Number,
    default: 3000, // Set default value to 3000
  },
  location: {
    type: String,
    default: null,
  },
  availability: {
    type: Boolean,
    default: false, // Default to false (unavailable)
  },
  schedule: {
    Monday: [timeSlotSchema],
    Tuesday: [timeSlotSchema],
    Wednesday: [timeSlotSchema],
    Thursday: [timeSlotSchema],
    Friday: [timeSlotSchema],
    Saturday: [timeSlotSchema], // Added Saturday
    Sunday: [timeSlotSchema]    // Added Sunday
  }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
});

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  experience: {
    type: String,
    default: null,
  },
  specialties: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  consultationFee: {
    type: Number,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  availability: {
    type: Boolean,
    default: false, // Default to false (unavailable)
  },
  schedule: {
    Monday: [timeSlotSchema],
    Tuesday: [timeSlotSchema],
    Wednesday: [timeSlotSchema],
    Thursday: [timeSlotSchema],
    Friday: [timeSlotSchema],
    Saturday: [timeSlotSchema], // Added Saturday
    Sunday: [timeSlotSchema]    // Added Sunday
  }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);

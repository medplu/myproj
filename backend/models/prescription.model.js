import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Use 'User' model for patients
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    default: '',
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacist', // Assuming Pharmacist model exists
  }],
  dateIssued: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;

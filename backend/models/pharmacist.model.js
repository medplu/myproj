import mongoose from 'mongoose';

const pharmacistSchema = new mongoose.Schema({
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
  // Add any other relevant fields for the pharmacist
  // For example, you might want to add an address, license number, etc.
}, { timestamps: true });

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
export default Pharmacist;

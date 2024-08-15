import Prescription from '../models/prescription.model.js';
import Doctor from '../models/doctor.model.js';
import User from '../models/user.model.js'; // For user validation
export const createPrescription = async (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming request body

  const { user_id, doctor_id, medication, dosage, instructions } = req.body;

  if (!user_id || !doctor_id || !medication || !dosage) {
    return res.status(400).json({
      message: 'Missing required fields: ' +
        `${!user_id ? 'user_id, ' : ''}` +
        `${!doctor_id ? 'doctor_id, ' : ''}` +
        `${!medication ? 'medication, ' : ''}` +
        `${!dosage ? 'dosage' : ''}`
    });
  }

  try {
    const doctor = await Doctor.findById(doctor_id);
    const user = await User.findById(user_id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const prescription = new Prescription({
      user_id,
      doctor_id,
      medication,
      dosage,
      instructions,
    });

    await prescription.save();

    res.status(201).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Share prescription with a chosen pharmacist
export const sharePrescriptionWithPharmacist = async (req, res) => {
  const { prescription_id, pharmacist_id } = req.body;

  if (!prescription_id || !pharmacist_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const prescription = await Prescription.findById(prescription_id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });

    // Validate pharmacist
    const pharmacist = await Pharmacist.findById(pharmacist_id);
    if (!pharmacist) return res.status(404).json({ message: 'Pharmacist not found' });

    // Add the pharmacist to the shared list if not already present
    if (!prescription.sharedWith.includes(pharmacist_id)) {
      prescription.sharedWith.push(pharmacist_id);
      await prescription.save();
    }

    res.status(200).json({ message: 'Prescription shared with pharmacist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve prescriptions for a user
export const getUserPrescriptions = async (req, res) => {
  const { user_id } = req.params;

  try {
    const prescriptions = await Prescription.find({ user_id }).populate('doctor_id', 'name').populate('sharedWith', 'name');
    
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Retrieve prescriptions shared with a pharmacist
export const getPharmacistPrescriptions = async (req, res) => {
  const { pharmacist_id } = req.params;

  try {
    const prescriptions = await Prescription.find({ sharedWith: pharmacist_id }).populate('user_id', 'name').populate('doctor_id', 'name');
    
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

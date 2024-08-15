import express from 'express';
import { createPrescription, sharePrescriptionWithPharmacist, getUserPrescriptions, getPharmacistPrescriptions } from '../controllers/prescription.controller.js';

const router = express.Router();

// Route to create a new prescription
router.post('/', createPrescription); // Ensure this matches your endpoint URL

// Route to share a prescription with a pharmacist
router.post('/share', sharePrescriptionWithPharmacist);

// Route to get all prescriptions for a user
router.get('/user/:user_id', getUserPrescriptions);

// Route to get all prescriptions shared with a pharmacist
router.get('/pharmacist/:pharmacist_id', getPharmacistPrescriptions);

export default router;

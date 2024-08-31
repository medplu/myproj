import appointMentSchema from "../models/appointment.model.js";
import OurServices from "../models/patient.service.js";
import reviewSchema from "../models/review.model.js";
import Users from "../models/user.model.js";


// controllers/doctor.controller.js

import Doctor from '../models/doctor.model.js';

// Set Schedule

export const updateConsultationFee = async (req, res) => {
  const { doctorId } = req.params;
  const { consultationFee } = req.body;

  // Validate request body
  if (typeof consultationFee !== 'number' || consultationFee < 0) {
    return res.status(400).json({ message: 'Invalid consultation fee' });
  }

  try {
    // Find and update the doctor's consultation fee
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { consultationFee },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(`Error updating consultation fee: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Update or set doctor's schedule
export const updateDoctorSchedule = async (req, res) => {
    try {
        const { userId } = req.body; // Changed to req.body to match the frontend request
        const { schedule } = req.body;

        const doctor = await Doctor.findOne({ userId });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Update the schedule
        doctor.schedule = schedule;
        await doctor.save();

        res.status(200).json({ message: "Schedule updated successfully", doctor });
    } catch (error) {
        console.log("Error in updateDoctorSchedule controller", error.message);
        res.status(500).json({ message: error.message });
    }
};



// Get Schedule
export const fetchSchedule = async (req, res) => {
  try {
    const { userId } = req.params;
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const schedules = await Schedule.find({ doctor: doctor._id }).sort({ date: 1 });

    if (!schedules.length) {
      return res.status(200).json({ message: 'No schedules found for this doctor' });
    }

    res.json(schedules);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const appointMentByDate = async (req, res, next) => {
    const { id, isAdmin, isDoctor } = req.user;
    try {
        if(isDoctor){
            const appointmentDate = await appointMentSchema.find({isDoctor:id, doctor_id: id});
            res.status(200).json(appointmentDate);
        }
        if (isAdmin) {
            const appointmentDate = await appointMentSchema.find({ appointmantDate: req.body.date })
            res.status(200).json(appointmentDate);
        } else {
            const appointmentDate = await appointMentSchema.find({ appointmantDate: req.body.date, user_id: id })
            res.status(200).json(appointmentDate);
        }
    } catch (err) {
        next(err);
    }
}
export const AddServices = async (req, res, next) => {
    const serviceData = new OurServices(req.body);
    try {
        const services = await serviceData.save();
        res.status(200).json(services);
    } catch (err) {
        next(err);
    }
}
export const ServicesList = async (req, res, next) => {
    try {
        const services = await OurServices.find();
        res.status(200).json(services);
    } catch (err) {
        next(err)
    }
}


export const DoctorList = async (req, res, next) => {
    try {
        // Fetch only doctors with a non-null consultationFee
        const doctorList = await Doctor.find(
            { consultationFee: { $exists: true, $ne: null } }, // Filter to include only doctors with non-null consultationFee
            { _id: 1, name: 1, image: 1, bio: 1, experience: 1, location: 1, specialties: 1, schedule: 1, consultationFee: 1 } // Include consultationFee in the projection
        );
        console.log('Fetched doctors from DB:', doctorList); // Log the fetched doctors
        res.status(200).json(doctorList);
    } catch (err) {
        next(err);
    }
};

// get a single doctor given the user_id
// Get Doctor
export const getDoctor = async (req, res, next) => {
    const { doctorId} = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

// Update a doctor's information by doctorId
export const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true });
      
        if (!updatedDoctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
      
        res.status(200).json(updatedDoctor);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
export const UpdateUserInfo = async (req, res, next) => {
    try {
        const response = await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const AddAppointMentCollection = async (req, res, next) => {
    const saveAppoint = new appointMentSchema(req.body)
    try {
        const addpointment = await saveAppoint.save();
        res.status(200).json(addpointment)
    }
    catch (err) {
        next(err);
    }
}

//Appopintment PatientList
export const AppointmentPatientsList = async (req, res, next) => {
    const { id, isAdmin, isDoctor } = req.user;
    
    try {
        if(isDoctor){
            const patientList = await appointMentSchema.find({doctor_id:id});
            res.status(200).json(patientList);
        }
        else if(isAdmin) {
            const appointmentPatients = await appointMentSchema.find({});
            res.status(200).json(appointmentPatients);
        } 
        else {
            const appointmentPatients = await appointMentSchema.find({ user_id: id });
            res.status(200).json(appointmentPatients);
        }
    }
    catch (err) {
        next(err);
    }
}

export const IsDoctor = async (req, res, next) => {
    const docEmail = req.body.email;
    try {
        const isDoc = await Users.findOne({ email: docEmail, isDoctor: true });
        if (isDoc) {
            const { password, ...others } = isDoc._doc;
            res.status(200).json({ ...others });
        } else {
            res.status(200).json(false);
        }
    } catch (err) {
        next(err);
    }
}


//Reviews

export const AddReview = async (req, res, next) => {
    const savedData = new reviewSchema(req.body);
    try {
        const saveReview = await savedData.save();
        res.status(200).json(saveReview);
    } catch (err) {
        next(err)
    }
}
export const ReviewsList = async (req, res, next) => {
    try {
        const response = await reviewSchema.find({});
        res.status(200).json(response)
    }
    catch (err) {
        next(err)
    }
}

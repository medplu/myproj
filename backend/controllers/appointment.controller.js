import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

export default function(io) {
  return {
    // Function to create a new appointment
    createAppointment: async (req, res) => {
      try {
        const userId = req.user._id; // Get user from middleware
        const { doctorId, date, time } = req.body;

        // Additional checks and logic here

        const newAppointment = new Appointment({
          user: userId,
          doctor: doctorId,
          date,
          time,
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
      } catch (error) {
        console.log("Error in createAppointment controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to get all appointments for a specific doctor
    getAllAppointments: async (req, res) => {
      try {
        const doctorId = req.params.doctorId;
        const doctor = await User.findById(doctorId);

        if (!doctor || doctor.accountType !== 'doctor') {
          return res.status(404).json({ message: "Doctor not found" });
        }

        const appointments = await Appointment.find({ doctor: doctorId });
        res.status(200).json(appointments);
      } catch (error) {
        console.log("Error in getAllAppointments controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to get all appointments for the logged-in user
    getAppointments: async (req, res) => {
      try {
        const userId = req.user._id; // Get user from middleware

        const appointments = await Appointment.find({ user: userId });
        res.status(200).json(appointments);
      } catch (error) {
        console.log("Error in getAppointments controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to get new appointments count for a specific doctor
    getNewAppointmentsCount: async (req, res) => {
      try {
        const doctorId = req.params.doctorId;
        const doctor = await User.findById(doctorId);

        if (!doctor || doctor.accountType !== 'doctor') {
          return res.status(404).json({ message: "Doctor not found" });
        }

        const newAppointmentsCount = await Appointment.countDocuments({ doctor: doctorId, status: 'new' });
        res.status(200).json({ newAppointmentsCount });
      } catch (error) {
        console.log("Error in getNewAppointmentsCount controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to reset new appointments count for a specific doctor
    resetNewAppointmentsCount: async (req, res) => {
      try {
        const doctorId = req.params.doctorId;
        const doctor = await User.findById(doctorId);

        if (!doctor || doctor.accountType !== 'doctor') {
          return res.status(404).json({ message: "Doctor not found" });
        }

        await Appointment.updateMany({ doctor: doctorId, status: 'new' }, { status: 'viewed' });
        res.status(200).json({ message: "New appointments count reset successfully" });
      } catch (error) {
        console.log("Error in resetNewAppointmentsCount controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to confirm an appointment
    confirmAppointment: async (req, res) => {
      try {
        const appointmentId = req.params.id;
        const userId = req.user._id; // Get user from middleware

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
          return res.status(404).json({ message: "Appointment not found" });
        }

        if (appointment.doctor.toString() !== userId.toString()) {
          return res.status(403).json({ message: "You are not authorized to confirm this appointment" });
        }

        appointment.status = 'confirmed';
        await appointment.save();
        res.status(200).json({ message: "Appointment confirmed successfully" });
      } catch (error) {
        console.log("Error in confirmAppointment controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    // Function to get all appointments for a specific user
    getUserAppointments: async (req, res) => {
      try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const appointments = await Appointment.find({ user: userId });
        res.status(200).json(appointments);
      } catch (error) {
        console.log("Error in getUserAppointments controller: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
}

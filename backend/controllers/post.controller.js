import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import { createError } from "./error.js";

export const createAppointment = async (req, res) => {
	try {
		const { date, time } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const newAppointment = new Appointment({
			user: userId,
			date,
			time,
		});

		await newAppointment.save();
		res.status(201).json(newAppointment);
	} catch (error) {
		console.log("Error in createAppointment controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAppointments = async (req, res) => {
	try {
		const userId = req.user._id.toString();
		const appointments = await Appointment.find({ user: userId });

		res.status(200).json(appointments);
	} catch (error) {
		console.log("Error in getAppointments controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteAppointment = async (req, res) => {
	try {
		const appointmentId = req.params.id;
		const userId = req.user._id.toString();

		const appointment = await Appointment.findById(appointmentId);
		if (!appointment) {
			return res.status(404).json({ error: "Appointment not found" });
		}

		if (appointment.user.toString() !== userId) {
			return res.status(401).json({ error: "You are not authorized to delete this appointment" });
		}

		await Appointment.findByIdAndDelete(appointmentId);

		res.status(200).json({ message: "Appointment deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAppointment controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateAppointment = async (req, res) => {
	try {
		const appointmentId = req.params.id;
		const userId = req.user._id.toString();
		const { date, time } = req.body;

		const appointment = await Appointment.findById(appointmentId);
		if (!appointment) {
			return res.status(404).json({ error: "Appointment not found" });
		}

		if (appointment.user.toString() !== userId) {
			return res.status(401).json({ error: "You are not authorized to update this appointment" });
		}

		appointment.date = date;
		appointment.time = time;
		await appointment.save();

		res.status(200).json(appointment);
	} catch (error) {
		console.log("Error in updateAppointment controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

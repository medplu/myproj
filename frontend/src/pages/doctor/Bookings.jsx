import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Bookings = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments/${doctorId}`);
        let appointmentsData = response.data.data;
        if (!Array.isArray(appointmentsData)) {
          appointmentsData = [appointmentsData];
        }
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleConfirmAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
    setTime('');
  };

  const handleSetTime = async () => {
    try {
      const response = await axios.post(`/api/appointments/confirm/${selectedAppointment._id}`, { time });
      console.log('Appointment confirmed:', response.data);
      // Update the appointments list after confirmation
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== selectedAppointment._id)
      );
      handleClose();
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // Implement the logic for rescheduling the appointment here
    console.log(`Rescheduling appointment with ID: ${appointmentId}`);
  };

  return (
    <div className="bg-gray-800 text-white text-center p-4 fixed inset-0 w-full h-full z-50 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <ArrowBackIcon 
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2>Your Upcoming Appointments</h2>
        <div></div>
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="p-4 bg-gray-900 bg-opacity-70 text-white border border-gray-800 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{appointment.name}</h2>
            <p className="text-gray-200">{appointment.gender}</p>
            <p className="text-gray-200">{appointment.email}</p>
            <p className="text-orange-500">{new Date(appointment.Date).toLocaleDateString()}</p>
            <div className="mt-2 flex justify-end space-x-4">
              <Button
                onClick={() => handleConfirmAppointment(appointment)}
                variant="contained"
                color="primary"
                className="confirmButton"
              >
                Confirm
              </Button>
              <Button
                onClick={() => handleRescheduleAppointment(appointment._id)}
                variant="contained"
                color="secondary"
              >
                Reschedule
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set Appointment Time</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please set the time for the appointment with {selectedAppointment?.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Appointment Time"
            type="time"
            fullWidth
            variant="outlined"
            value={time}
            onChange={handleTimeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="bg-orange-400 bg-opacity-50 ">
            Cancel
          </Button>
          <Button onClick={handleSetTime} className='bg-orange-500 bg-opacity-50'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bookings;

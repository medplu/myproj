import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarPlus } from 'react-icons/fa';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    { date: new Date(), patient: 'John Doe', reason: 'Routine Checkup' }
  ]);
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    patient: '',
    reason: ''
  });

  const addAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ date: new Date(), patient: '', reason: '' });
  };

  const renderAppointments = () => {
    return appointments
      .filter(appointment => appointment.date.toDateString() === selectedDate.toDateString())
      .map((appointment, index) => (
        <li key={index} className="border-b py-2">
          {appointment.patient} - {appointment.reason}
        </li>
      ));
  };

  return (
    <div>
      <h3>Calendar</h3>
      <div className="mb-4">
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} inline />
      </div>
      <h4>Appointments on {selectedDate.toDateString()}:</h4>
      <ul className="mt-4">
        {renderAppointments()}
      </ul>
      <div className="mt-4">
        <h4>Add New Appointment</h4>
        <input
          type="text"
          value={newAppointment.patient}
          onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
          placeholder="Patient Name"
          className="border p-2 rounded mb-2"
        />
        <input
          type="text"
          value={newAppointment.reason}
          onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
          placeholder="Reason"
          className="border p-2 rounded mb-2"
        />
        <DatePicker
          selected={newAppointment.date}
          onChange={date => setNewAppointment({ ...newAppointment, date })}
          className="ml-2 mb-2"
        />
        <button onClick={addAppointment} className="ml-2 p-2 bg-blue-500 text-white rounded flex items-center">
          <FaCalendarPlus className="mr-2" /> Add Appointment
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;

import React, { useState } from 'react';
import axios from 'axios';

const BookingFormModal = ({ doctor, onCancel, userId, authUser }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    gender: '',
    phone: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(doctor);
    try {
      const { date, time, gender, phone, age } = formData;
      const doctorId = doctor._id;
      const { username, email } = authUser;
  
      const dateTime = `${date} ${time}`;
      const dateOnly = dateTime.split(' ')[0]; // Get the date part only
  
      const response = await axios.post('/api/appointments', {
        name: username,
        phone,
        email: email,
        gender,
        age,
        Date: dateOnly, // Use the date part only
        doctorId, // Change this line
        userId,
      });
  
      console.log('Appointment created:', response.data);
      onCancel(); // Close the modal on success
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4 text-slate-900">Book Appointment with {doctor.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block mb-2 font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block mb-2 font-medium text-gray-700">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;

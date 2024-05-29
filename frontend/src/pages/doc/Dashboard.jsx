import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const DoctorPage = ({ authUser }) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/doctors/${id}`);
        setDoctor(response.data);
        fetchDoctorSchedule(response.data.id);
      } catch (error) {
        console.error("Failed to fetch doctor's data", error);
      }
    };

    if (authUser && authUser.specialties === 'doctor') {
      fetchDoctorData();
    }
  }, [id, authUser]);

  const fetchDoctorSchedule = async (doctorId) => {
    try {
      const response = await axios.get(`/api/doctors/${doctorId}/schedule`);
      setSchedule(response.data);
    } catch (error) {
      console.error("Failed to fetch schedule", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/appointments', {
        username: formData.name,
        email: formData.email,
        appointmantDate: `${formData.date}T${formData.time}`,
        doctor_id: id,
        user_id: "user-id-placeholder", // Replace with actual user ID
      });
      setSubmitStatus('Appointment booked successfully!');
      setFormData({ name: "", email: "", date: "", time: "" });
      setBookingFormVisible(false);
    } catch (error) {
      setSubmitStatus('Failed to book appointment.');
    }
  };

  const isDateAvailable = (date) => {
    const scheduleEntry = schedule.find((entry) => entry.date === date);
    return scheduleEntry && scheduleEntry.available;
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    if (isDateAvailable(value)) {
      setFormData({ ...formData, date: value });
    } else {
      alert("Selected date is not available");
    }
  };

  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.profession}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p className="text-gray-700">{doctor.bio}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Doctor's Schedule</h2>
          <ul>
            {schedule.map((entry) => (
              <li key={entry.date}>
                {entry.date}: {entry.available ? "Available" : "Not Available"}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Book an Appointment</h2>
          {!bookingFormVisible ? (
            <button
              onClick={() => setBookingFormVisible(true)}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
            >
              Book Appointment
            </button>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleDateChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Submit
              </button>
            </form>
          )}
          {submitStatus && <p className="mt-4 text-center">{submitStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;

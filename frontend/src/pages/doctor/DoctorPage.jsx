import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams to access URL parameters

const DoctorPage = ({ doctors }) => {
  const { id } = useParams(); // Access the doctor ID from the URL

  // State to store the selected doctor's information
  const [doctor, setDoctor] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    // Find the doctor in the list of doctors based on the ID
    const selectedDoctor = doctors.find((doc) => doc.id === parseInt(id));
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    }
  }, [doctors, id]);

  // If the doctor is not found, display a message
  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission logic, like sending data to server or storing in state
    console.log(formData);
    // For demonstration purposes, reset form data and hide booking form
    setFormData({
      name: "",
      email: "",
      date: "",
      time: ""
    });
    setBookingFormVisible(false);
  };

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
          <p className="text-gray-700">{doctor.Bio}</p>
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
                  onChange={handleFormChange}
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
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;

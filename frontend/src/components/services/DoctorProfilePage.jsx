import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = ({openBookingModal }) => {
  const [showBio, setShowBio] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`/api/schedules/${doctorId}`);
        setSchedules(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${doctorId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctor();
    fetchSchedules();
  }, [doctorId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="h-screen bg-gray-900 text-white w-full">
      {doctor && (
        <div className="flex flex-col items-center py-8 shadow-md">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 mask mask-hexagon"
            onClick={() => console.log("Image clicked")} // example onClick handler for image
          />
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-lg text-white">{doctor.specialties}</p>
          <div
            key={doctor._id}
            className="bg-gray-900 flex text-white p-2 rounded-lg shadow-lg m-2 flex-shrink-0"
            style={{ minWidth: '300px' }}
          >
            <button
              onClick={() => openBookingModal(doctor)}
              className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-orange-500 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
            >
              Book
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Bio</h3>
            <button onClick={() => setShowBio(!showBio)} className="text-white">
              {showBio ? "Hide Bio" : "Show Bio"}
            </button>
          </div>
          {showBio && <p>{doctor?.bio}</p>}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Schedule</h3>
          {schedules.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {schedules.map((daySchedule, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold">{daySchedule.day}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {daySchedule.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="bg-gray-700 rounded-lg p-2">
                        <p className="text-sm">Time: {slot.time}</p>
                        <p className="text-sm">Place: {slot.place}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No schedule available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;

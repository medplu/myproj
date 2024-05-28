import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const Doctors = ({authUser, userId}) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${userId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`/api/schedules/${userId}`);
        setSchedule(response.data);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
        setError('Failed to fetch schedule. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
    fetchSchedule();
  }, [id, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-800">
      <div className="max-w-sm mx-auto bg-inherit dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
          {doctor && (
  <img
    className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
    src={doctor.image}
    alt=""
  />
)}

            <div className="py-2">
            {doctor && (
  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{doctor.name}</h3>
)}

{doctor && (
  <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
    <svg
      className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        className=""
        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      />
    </svg>
    {doctor.location}
  </div>
)}

            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Follow
            </button>
            <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
              Message
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          <h3 className="text-lg font-bold mb-2">Schedule</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2">Day</th>
                <th className="py-2">Time</th>
                <th className="py-2">Place</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((daySchedule) => (
                <tr key={daySchedule._id}>
                  <td className="border px-4 py-2">{daySchedule.day}</td>
                  <td className="border px-4 py-2">
                    {daySchedule.slots.map((slot) => (
                      <div key={slot._id}>{slot.time}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {daySchedule.slots.map((slot) => (
                      <div key={slot._id}>{slot.place}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd } from 'react-icons/fa';
import Card from './Card';
import CreateSchedule from './CreateSchedule';

const DoctorPage = ({ userId, authUser }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchSchedule();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-md mx-auto">
        <div className='bg-gray-900 text-white rounded-lg p-4 flex items-center space-x-4 mb-4'>
          <div className="flex-shrink-0">
            <FaUserMd className="h-12 w-12 text-orange-500" />
          </div>
          <h1>Welcome Doctor {authUser.username}</h1>
        </div>
        <Card />
        <CreateSchedule userId={userId} />
        {loading ? (
          <p className='text-white'>Loading schedule...</p>
        ) : error ? (
          <p className='text-white'>{error}</p>
        ) : (
          <div className="bg-gray-900 text-white rounded-lg p-4">
            <h2 className="mb-4">Your Schedule</h2>
            {schedule.map((daySchedule, index) => (
              <div key={index} className="mb-4">
                <h3>{daySchedule.day}</h3>
                {daySchedule.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="mb-2">
                    <p>Time: {slot.time}</p>
                    <p>Place: {slot.place}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;

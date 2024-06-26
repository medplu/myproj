import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd } from 'react-icons/fa';
import Card from './Card';
import CreateSchedule from './CreateSchedule';
import ScheduleList from './ScheduleList';
import ToolModal from './ToolModal';
import { FaNotesMedical, FaCalendarAlt, FaBell, FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Bookings from './Bookings'; // Import the Booking component
import BottomNavigation from '../../components/BottomNavigation';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const DoctorPage = ({ userId, authUser }) => {
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const { doctorId } = useParams();
  const [showBookings, setShowBookings] = useState(false); // Add a new state variable to control the visibility of the Bookings component
  const [newAppointmentsCount, setNewAppointmentsCount] = useState(0); // State for new appointments count

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

  useEffect(() => {
    const fetchNewAppointmentsCount = async () => {
      try {
        const response = await axios.get(`/api/appointments/new/count/${doctorId}`);
        setNewAppointmentsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching new appointments count:', error);
      }
    };

    fetchNewAppointmentsCount();

    // Poll for new appointments count every minute
    const intervalId = setInterval(fetchNewAppointmentsCount, 60000);

    return () => clearInterval(intervalId);
  }, [doctorId]);

  const handleIconClick = (iconName) => {
    // Perform an action based on the name of the icon that was clicked
    switch (iconName) {
      case 'appointments':
        setShowBookings(true); // Show the Bookings component when the 'appointments' icon is clicked
        // Reset the new appointments count
        setNewAppointmentsCount(0);
        axios.post(`/api/appointments/new/reset/${doctorId}`).catch(error => console.error('Error resetting new appointments count:', error));
        break;
      // ... other cases ...
    }
  };

  const filteredSlots = schedule
    .filter((s) => s.day === selectedDay)
    .flatMap((s) => s.slots);

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-900 text-white rounded-lg p-4 flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <FaUserMd className="h-12 w-12 text-orange-500" />
          </div>
          <h1>Welcome Doctor {authUser.username}</h1>
        </div>
        <Card doctorId={doctorId} />
        {showBookings && <Bookings className="fixed inset-0 w-full h-full z-50" doctorId={doctorId} />}
        
        {loading ? (
          <p className="text-white">Loading schedule...</p>
        ) : error ? (
          <p className="text-white">{error}</p>
        ) : (
          <div className="bg-gray-900 text-white rounded-lg p-4 mt-4">
            <h2 className="mb-4 flex justify-between items-center">
              <span>Your Schedule</span>
              <div className="space-x-2">
                <button
                  className="px-3 py-1 bg-gray-800 text-white bg-opacity-50 rounded hover:bg-green-600"
                  onClick={() => setShowCreateSchedule(!showCreateSchedule)}
                >
                  Add
                </button>
                <button
                  className="px-3 py-1 bg-gray-800 bg-opacity-50 text-white rounded hover:bg-blue-600"
                  onClick={() => {/* logic to edit schedule slot */}}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-gray-800 text-orange-500 rounded hover:bg-red-600"
                  onClick={() => {/* logic to delete schedule slot */}}
                >
                  Delete
                </button>
              </div>
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-slate-900 font-medium">Select Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            {showCreateSchedule && (
              <CreateSchedule doctorId={userId} />
            )}
            <ScheduleList slots={filteredSlots} />
          </div>
        )}
      </div>
      <div className="bg-gray-900 text-white rounded-lg p-4 mt-2">
        <h2 className="mb-2">Organizational Tools</h2>
        <div className="flex overflow-x-auto gap-4">
          <div
            className="flex items-center space-x-2 p-2 bg-orange-200 bg-opacity-20 rounded-lg transform transition hover:scale-105 cursor-pointer"
            onClick={() => setActiveTool('Notes')}
          >
            <FaNotesMedical className="text-2xl" />
            <span>Notes</span>
          </div>
          <div
            className="flex items-center space-x-2 p-2 bg-orange-200 bg-opacity-20 rounded-lg transform transition hover:scale-105 cursor-pointer"
            onClick={() => setActiveTool('Calendar')}
          >
            <FaCalendarAlt className="text-2xl" />
            <span>Calendar</span>
          </div>
          <div
            className="flex items-center space-x-2 p-2 bg-orange-200 bg-opacity-20 rounded-lg transform transition hover:scale-105 cursor-pointer"
            onClick={() => setActiveTool('Reminders')}
          >
            <FaBell className="text-2xl" />
            <span>Reminders</span>
          </div>
          <div
            className="flex items-center space-x-2 p-2 bg-orange-200 bg-opacity-20 rounded-lg transform transition hover:scale-105 cursor-pointer"
            onClick={() => setActiveTool('Patient Search')}
          >
            <FaSearch className="text-2xl" />
            <span>Patient Search</span>
          </div>
        </div>
      </div>

      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}

      <BottomNavigation onIconClick={handleIconClick} newAppointmentsCount={newAppointmentsCount} /> {/* Pass the handleIconClick function as the onIconClick prop and the newAppointmentsCount prop */}
    </div>
  );
};

export default DoctorPage;

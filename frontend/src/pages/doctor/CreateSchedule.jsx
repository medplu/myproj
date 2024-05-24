import React, { useState } from 'react';
import axios from 'axios';

const CreateSchedule = ({ userId }) => {
  const [day, setDay] = useState('Monday');
  const [slots, setSlots] = useState([{ time: '', place: '' }]);

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const handleAddSlot = () => {
    setSlots([...slots, { time: '', place: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/schedules/${userId}`, { day, slots });
      alert('Schedule updated successfully');
      setSlots([{ time: '', place: '' }]); // Clear the form after submission
    } catch (error) {
      console.error('Failed to update schedule:', error);
      alert('Failed to update schedule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 text-white rounded-lg p-4 mb-4">
      <div className="mb-4">
        <label className="block mb-2">Day</label>
        <select 
          value={day} 
          onChange={(e) => setDay(e.target.value)} 
          className="p-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>

      {slots.map((slot, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">Time Slot</label>
          <input
            type="text"
            value={slot.time}
            onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
            placeholder="Time"
            className="p-2 rounded bg-gray-700 border border-gray-600 mb-2 w-full"
          />
          <input
            type="text"
            value={slot.place}
            onChange={(e) => handleSlotChange(index, 'place', e.target.value)}
            placeholder="Place"
            className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
          />
        </div>
      ))}

      <button type="button" onClick={handleAddSlot} className="bg-orange-500 p-2 rounded mb-4">
        Add Slot
      </button>
      <button type="submit" className="bg-green-500 p-2 rounded">
        Save Schedule
      </button>
    </form>
  );
};

export default CreateSchedule;

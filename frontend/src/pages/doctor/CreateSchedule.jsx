import React, { useState } from 'react';
import axios from 'axios';

const CreateSchedule = ({ doctorId }) => {
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([{ startTime: '', endTime: '', place: '' }]);

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: '', endTime: '', place: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/schedules/${doctorId}`, { day, date, slots });
      alert('Schedule created successfully');
    } catch (error) {
      console.error('Failed to create schedule:', error);
      alert('Failed to create schedule. Please try again.');
    }
  };

  return (
    <div className=" bg-gray-100 text-slate-900 p-4 rounded-lg shadow">
      <h2 className="text-lg text-slate-900 font-semibold mb-4">Create Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Day:</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {slots.map((slot, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Time Slot:</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={slot.startTime}
                onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                className="p-2 border rounded"
                placeholder="Start Time (HH:mm)"
                required
              />
              <div className="flex items-center justify-center">to</div>
              <input
                type="text"
                value={slot.endTime}
                onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                className="p-2 border rounded"
                placeholder="End Time (HH:mm)"
                required
              />
              <input
                type="text"
                value={slot.place}
                onChange={(e) => handleSlotChange(index, 'place', e.target.value)}
                placeholder="Place"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Slot
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Create Schedule
        </button>
      </form>

      
    </div>
  );
};

export default CreateSchedule;

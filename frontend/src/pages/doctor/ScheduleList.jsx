import React from 'react';
import './ScheduleList.css'; // Import the CSS file for custom styles

const ScheduleList = ({ slots }) => {
  return (
    <div className="schedule-container">
      <div className="flex space-x-4 p-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="min-w-[150px] bg-white p-4 rounded-lg shadow-md flex-shrink-0"
          >
            <p className="font-medium text-sm text-slate-900">
              {slot.startTime} - {slot.endTime}
            </p>
            <p className="text-sm text-gray-700">{slot.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;

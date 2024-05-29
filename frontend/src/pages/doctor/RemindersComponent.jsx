import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RemindersComponent = () => {
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState(new Date());

  const addReminder = () => {
    setReminders([...reminders, { reminder, date }]);
    setReminder('');
    setDate(new Date());
  };

  return (
    <div>
      <h3>Reminders</h3>
      <input
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add a reminder"
        className="border p-2 rounded"
      />
      <DatePicker selected={date} onChange={date => setDate(date)} className="ml-2" />
      <button onClick={addReminder} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Reminder
      </button>
      <ul className="mt-4">
        {reminders.map((rem, index) => (
          <li key={index} className="border-b py-2">
            {rem.reminder} - {rem.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersComponent;

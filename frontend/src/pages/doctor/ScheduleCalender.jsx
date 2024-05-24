import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleCalendar = ({ schedule }) => {
  const events = [];

  // Transform schedule data into calendar events
  Object.entries(schedule).forEach(([day, timeSlots]) => {
    timeSlots.forEach((timeSlot) => {
      const startTime = moment(`${day} ${timeSlot.time}`, 'dddd HH:mm').toDate();
      const endTime = moment(startTime).add(1, 'hour').toDate(); // Assuming each slot is 1 hour
      events.push({
        title: `Appointment at ${timeSlot.place}`,
        start: startTime,
        end: endTime,
      });
    });
  });

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default ScheduleCalendar;

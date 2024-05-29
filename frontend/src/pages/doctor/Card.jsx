import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Card = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments/all/${doctorId}`);
        let appointmentsData = response.data.data;
        if (!Array.isArray(appointmentsData)) {
          appointmentsData = [appointmentsData];
        }
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gray-800 text-white text-center p-4 rounded-lg shadow-md">
    <h2>Your upcoming appointments</h2>
      <Slider {...settings}>
        {appointments.map((appointment) => (
          <div key={appointment._id} className="p-2">
            <div className="w-full p-4 bg-gray-900 bg-opacity-70 text-white border border-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-bold">{appointment.name}</h2>
              <p className="text-gray-200">{appointment.gender}</p>
              <p className="text-gray-200">{appointment.email}</p>
              <p className="text-gray-200">{appointment.phone}</p>
              <p className="text-gray-200">{appointment.time}</p>
              <p className="text-orange-500">{new Date(appointment.Date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Card;

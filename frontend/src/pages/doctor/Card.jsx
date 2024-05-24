import React, { useState, useEffect } from 'react';

const profiles = [
  {
    name: "Bonnie Green",
    appointment: "Cardiologist",
    time: "10:00 AM",
    imgSrc: "",
  },
  {
    name: "John Doe",
    appointment: "physiotherapy",
    time: "11:00 AM",
    imgSrc: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714975960/doctor_jztjki.png",
  },
  {
    name: "Jane Smith",
    appointment: "cardiotherapy",
    time: "12:00 PM",
    imgSrc: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg",
  },
];

const Card = () => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);
  const [profileIndex, setProfileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 10000); // Change profile every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentProfile(profiles[profileIndex]);
  }, [profileIndex]);

  return (
    <div className="w-full sm:w-6/12 lg:w-4/12 xl:w-4/12 overflow-y-scroll space-y-3 border-2 rounded-2xl bg-white border-orange-500 shadow-2xl z-10 ">
      <h1 className='text-center font-bold text-slate-950 '>Upcoming appointments</h1>
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-slate-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-800 dark:focus:ring-gray-700 rounded-lg text-md p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="ffff" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div id="dropdown" className="z-10 hidden text-slate-900 list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-slate-900 dark:hover:text-white">Edit</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={currentProfile.imgSrc} alt={`${currentProfile.name} image`} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{currentProfile.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">{currentProfile.appointment}</span>
        <span className="text-sm text-orange-500 dark:text-gray-400 animate-pulse">{currentProfile.time}</span>
        <div className="flex mt-4 md:mt-6">
          <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Note</a>
          <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-orange-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-orange-500 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Reschedule</a>
        </div>
      </div>
    </div>
  );
};

export default Card;

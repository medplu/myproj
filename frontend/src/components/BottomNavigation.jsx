import React from 'react';
import { FaHome, FaWallet, FaSlidersH, FaUserCircle } from 'react-icons/fa';
import { RiHomeGearLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";

const BottomNavigation = ({ onIconClick, newAppointmentsCount }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <button
          type="button"
          onClick={() => onIconClick('appointments')}
          className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
        >
          <IoIosNotificationsOutline className="w-8 h-8 mb-2 text-red-800 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500" />
          {newAppointmentsCount > 0 && (
            <span className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {newAppointmentsCount}
            </span>
          )}
          <span className="text-sm text-red-800 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500">
            Appointments
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
        >
          <FaWallet className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-slate-900 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Accounts
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <FaSlidersH className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-slate-900 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Settings
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600"
        >
          <FaUserCircle className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-slate-900 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;

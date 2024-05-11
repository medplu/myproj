import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';
import logo from '../../assets/medplus.svg';
import doctor from '../../assets/doc.png';

const TopSection = ({ authUser }) => (
    <div className="bg-slate-800  text-white p-4 flex sticky top-0 z-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] items-center justify-between">
        <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                {}
            </div>
        </div>
        <div className="flex items-center justify-center flex-1">
            <div className="flex items-center justify-end gap-4 w-full">
                <img src={logo} alt="Logo" className="h-8 w-8  mr-14" />
                <img src={doctor} alt="Doctor" className="h-8 w-8 mr-2" />
                <Link to='/notifications'>
                    <IoNotifications className="text-2xl" />
                </Link>
            </div>
        </div>
    </div>
);

export default TopSection;

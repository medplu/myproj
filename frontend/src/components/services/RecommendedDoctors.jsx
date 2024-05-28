import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import Modal from 'react-modal';
import { StarRating } from './Ratings';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Gedion',
    specialty: 'Cardiologist',
    location: 'Kajiado',
    rating: 4.5,
    price: 1800,
    imageUrl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1714413116/ud5hxekv1kjrnye9k3bu.jpg',
  },
  {
    id: 2,
    name: 'Dr. Linda',
    specialty: 'Paediatrician',
    location: 'Nairobi',
    rating: 4.5,
    price: 1800,
    imageUrl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg',
  },
  {
   id: 3,
   name: 'Dr. Christine',
   specialty: 'Neurologist',
   location: 'Eldoret',
   rating: 3.5,
   price: 2000,
   imageUrl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg'
  },
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // adjust this value to change the size of the modal
    maxWidth: '600px', // maximum width for larger screens
    height: 'auto',
    maxHeight: '90vh', // maximum height for smaller screens
    overflow: 'auto',
  },
};

function RecommendedDoctors() {
  const [showMenu, setShowMenu] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const handleViewClick = (doctor) => {
    navigate(`/doctors/${doctor.id}`);
  };
  
  const [rating, setRating] = useState(0);
  const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);

  const handleRateClick = (doctor) => {
    setSelectedDoctor(doctor);
    openRatingModal();
  };

  const openRatingModal = () => {
    setRatingModalIsOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalIsOpen(false);
  };

  const handleRate = (star) => {
    setRating(star);
    console.log(`Rated ${selectedDoctor.name} with ${star} stars`);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleMenuClick = (id) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    setBookingDetails({
      ...bookingDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bookingDetails);
    alert('Booking successful!');
    setModalIsOpen(false);
  };

  return (
    <div className="px-4 py-4">
      <h4 className="font-semibold text-center mb-6 text-lg">Our Top Doctors</h4>
      <div className="flex overflow-x-scroll pb-2">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex-shrink-0 w-60 md:w-72 mr-4">
            <div className="bg-gray-700 shadow rounded-lg p-4 relative">
              <button
                onClick={() => handleMenuClick(doctor.id)}
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <IoMdMore className="text-white h-6 w-6" />
              </button>
              {showMenu === doctor.id && (
                <div className="absolute right-0 mt-8 mr-2 bg-white text-black p-2 rounded shadow-lg z-10">
                  <p className="cursor-pointer" onClick={() => handleBookClick(doctor)}>Book</p>
                  <p className="cursor-pointer" onClick={() => handleRateClick(doctor)}>Rate</p>
                  <p className="cursor-pointer" onClick={() => handleViewClick(doctor)}>View</p>
                </div>
              )}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Book Doctor"
                style={customStyles}
              >
                <h2 className="text-xl font-bold mb-4">
                  {selectedDoctor ? `Book Doctor ${selectedDoctor.name}` : 'Book Doctor'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={bookingDetails.name}
                      onChange={handleInputChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={bookingDetails.email}
                      onChange={handleInputChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingDetails.date}
                      onChange={handleInputChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingDetails.time}
                      onChange={handleInputChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </form>
                <button onClick={closeModal} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
              </Modal>
              <Modal
                isOpen={ratingModalIsOpen}
                onRequestClose={closeRatingModal}
                contentLabel="Rate Doctor"
                style={customStyles}
              >
                <h2 className="text-xl font-bold mb-4">
                  {selectedDoctor ? `Rate Doctor ${selectedDoctor.name}` : 'Rate Doctor'}
                </h2>
                <StarRating rating={rating} onRate={handleRate} />
              </Modal>
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-40 object-cover rounded-sm"
              />
              <div className="mt-2">
                <h5 className="font-semibold text-md text-slate-50">{doctor.name}</h5>
                <p className="text-sm text-white">{doctor.specialty}</p>
                <p className="text-sm text-white">{doctor.location}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-orange-500">Rating: {doctor.rating}</span>
                  <span className="text-xs text-orange-500 ml-2">Ksh {doctor.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedDoctors;

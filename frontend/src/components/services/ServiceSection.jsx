import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import CategoryCard from "../../components/category/CategoryCard";
import ambulanceIcon from "../../assets/icons8-neurology-78.png";
import flaskIcon from "../../assets/icons8-cardiology-55.png";
import kidneyIcon from "../../assets/icons8-kidney-64.png";
import cancerIcon from "../../assets/icons8-cancer-ribbon-48.png";
import pregnancyIcon from "../../assets/icons8-pregnancy-48.png";
import pediatricsImage from "../../assets/icons/icons8-children-51.png";
import ambulanceService from '../../assets/icons/icons8-ambulance-48.png';
import labIcon from "../../assets/icons/icons8-laboratory-48.png";
import radIcon from "../../assets/icons/icons8-x-men-16.png";
import paedImage from "../../assets/icons/icons8-children-51.png";
import teethIcon from "../../assets/icons/icons8-molar-48.png";
import mentalIcon from "../../assets/icons/icons8-advice-48.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PatientPage = ({ authUser }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const categoriesSets = [
    [
      { icon: ambulanceService, description: "", title: "ambulance" },
      { icon: labIcon, description: "", title: "labs" },
      { icon: radIcon, description: "", title: "Radiology" },
      { icon: paedImage, description: "", title: "Paediatrician" },
      { icon: teethIcon, description: "", title: "Dentist" },
      { icon: mentalIcon, description: "", title: "counselling" }
    ],
    [
      { icon: ambulanceIcon, description: "", title: "Neurologist" },
      { icon: flaskIcon, description: "", title: "Cardiologist" },
      { icon: kidneyIcon, description: "", title: "Nephrologist" },
      { icon: pregnancyIcon, description: "", title: "Gynaecologist" },
      { icon: cancerIcon, description: "", title: "Oncologist" },
      { icon: pediatricsImage, description: "", title: "Paediatrician" }
    ]
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors'); // Adjust the URL according to your backend route
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
            default:
              setError("An unknown error occurred.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSetChange = (index) => {
    setCurrentIndex(index);
    if (index === 1) {
      filterDoctorsBySpecialty(categoriesSets[1][0].title);
    } else {
      setFilteredDoctors([]);
    }
  };

  const filterDoctorsBySpecialty = (specialty) => {
    const filtered = doctors.filter((doctor) => doctor.specialties === specialty);
    setFilteredDoctors(filtered);
  };

  const handleCategoryCardClick = (title) => {
    filterDoctorsBySpecialty(title);
  };

  
  const renderMap = () => {
    if (window.google && window.google.maps && userLocation) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 12
      });

      map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPosition({ lat, lng });
        new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "Selected Location"
        });
      });

      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location"
      });
    }
  };
  const loadGoogleMapsScript = () => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true; // This makes the script load asynchronously
      script.defer = true;
      window.initMap = renderMap; // Ensure renderMap is called after the script is loaded
      document.head.appendChild(script);
    } else {
      renderMap();
    }
  };

  

  useEffect(() => {
    if (userLocation) {
      loadGoogleMapsScript();
    }
  }, [userLocation]);

  if (loading) {
    return <div>Loading...</div>; // Customize the loading state as needed
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Customize the error state as needed
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="relative w-full h-50 bg-base-100 shadow-xl image-full flex-shrink-0">
        <figure>
          <img src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg" alt="Doctor" className="w-full h-48 object-cover" />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        </figure>
        <div className="absolute top-0 mt-20 mb-4 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
          <h2 className="card-title text-white text-center font-bold z-10">Hello {authUser.name}</h2>
          <p className="text-white font-bold z-10">Welcome, Our Doctors are available</p>
          <div className="flex items-center justify-between mt-3 px-3 z-10">
            <div className="relative w-full">
              <input type="text" className="bg-purple-white shadow text-slate-950 rounded-xl border-0 p-3 w-full" placeholder="Type search..." />
              <div className="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
                <FaSearch className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-5 lg:pb-20 lg:pt-[120px] dark:bg-dark flex-shrink-0">
        <div className="container">
          <div className="flex justify-center">
            <div className="inline-flex items-center overflow-hidden rounded-lg border-gray-800 dark:border-dark-3">
              <button
                className={`border-r border-stroke px-4 py-3 text-base font-medium text-white last-of-type:border-r-0 hover:bg-gray-2 hover:text-primary dark:border-dark-3 dark:text-white
                  ${currentIndex === 0 ? "font-bold bg-orange-500 shadow-xl" : ""}`}
                onClick={() => handleSetChange(0)}
              >
                Categories
              </button>
              <button
                className={`border-r border-stroke px-4 py-3 text-base font-medium text-dark last-of-type:border-r-0 hover:bg-gray-2 hover:text-primary dark:border-dark-3 dark:text-white
                  ${currentIndex === 1 ? "font-bold bg-orange-500 shadow-xl" : ""}`}
                onClick={() => handleSetChange(1)}
              >
                Specialties
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex overflow-x-scroll pb-4 hide-scroll-bar flex-shrink-0">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
          {categoriesSets[currentIndex]?.map((category, index) => (
            <div key={index} className="p-2">
              <CategoryCard icon={category.icon} title={category.title} description={category.description} onClick={() => handleCategoryCardClick(category.title)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex overflow-x-scroll pb-4 hide-scroll-bar">
        {(filteredDoctors.length ? filteredDoctors : doctors).map((doctor) => (
          <div key={doctor._id} className="bg-gray-900 flex text-white p-2 rounded-lg shadow-lg m-2 flex-shrink-0" style={{minWidth: '300px'}}>
            <img src={doctor.image} alt={doctor.name} className="w-24 h-24 mb-3 rounded-full shadow-lg" />
            <div className="p-2">
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <h3>{doctor.specialties}</h3>
              <p className="text-orange-500">{doctor.consultationFee}</p>
              <div className="flex">
                <p className="text-sm text-gray-600 flex items-center">
                  <MdLocationOn className="mr-1 text-blue-600" /> {doctor.location}
                </p>
                <button className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-orange-500 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userLocation && <div id="map" style={{ height: "400px", width: "100%" }}></div>}
    </div>
  );
};

export default PatientPage;

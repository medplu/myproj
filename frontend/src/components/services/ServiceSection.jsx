import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion"; 
import ambulanceIcon from "../../assets/icons8-neurology-78.png";
import flaskIcon from "../../assets/icons8-cardiology-55.png";
import kidneyIcon from "../../assets/icons8-kidney-64.png";
import cancerIcon from "../../assets/icons8-cancer-ribbon-48.png";
import CategoryCard from "../../components/category/CategoryCard";
import pregnancyIcon from "../../assets/icons8-pregnancy-48.png";
import pediatricsImage from "../../assets/icons/icons8-children-51.png";
import ambulanceService from '../../assets/icons/icons8-ambulance-48.png';
import labIcon from "../../assets/icons/icons8-laboratory-48.png";
import radIcon from "../../assets/icons/icons8-x-men-16.png";
import paedImage from "../../assets/icons/icons8-children-51.png";
import teethIcon from "../../assets/icons/icons8-molar-48.png";
import mentalIcon from "../../assets/icons/icons8-advice-48.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedDoctors from "./RecommendedDoctors";

const PatientPage = ({ authUser, doctors }) => {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriesSets = [
    [
      { icon: ambulanceService, description: "", title: "ambulance" },
      { icon: labIcon, description: "", title: "labs" },
      { icon: radIcon, description: "", title: "Radiology" },
      { icon: paedImage, description: "", title: "Paediatrician" },
      { icon: teethIcon, description: "", title: "Dentist" },
      { icon: mentalIcon, description: "", title: "canselling" }
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
  

  
  const handleSetChange = (index) => {
    setCurrentIndex(index);
    if (index === 1) {
      // Filter doctors by the first specialty in the specialties set
      filterDoctorsBySpecialty(categoriesSets[1][0].title);
    } else {
      // Reset filteredDoctors to show all doctors when switching back to Categories
      setFilteredDoctors([]);
    }
  };
  
  const filterDoctorsBySpecialty = (specialty) => {
    const filtered = doctors.filter((doctor) => doctor.profession === specialty);
    setFilteredDoctors(filtered);
  };
  
  const handleCategoryCardClick = (title) => {
    filterDoctorsBySpecialty(title);
  };
  
   
  
  
  const settings = {
    // Other settings...
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false, // Disable center mode on mobile
          variableWidth: false, // Disable variable width on mobile
          arrows: false, // Hide arrows on mobile
          dots: false, // Hide dots on mobile
          swipeToSlide: true, // Allow swipe to slide on mobile
          touchMove: true, // Allow touch move on mobile
          draggable: true, // Allow dragging on mobile
          infinite: false // Disable infinite loop on mobile
        }
      }
    ]
  };
  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto  bg-gray-900 text-white ">
      <div className="w-full h-50 bg-base-100 shadow-xl image-full relative">
      <figure><img src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg" alt="Doctor" className="w-full h-48 object-cover" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      </figure>
      <div className="absolute top-0  mt-20 mb-4 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
        <h2 className="card-title text-white text-center font-bold z-10">Hello {authUser.username}</h2>
        <p className="text-white font-bold z-10">Welcome, Our Doctors are available</p>
        {/* create a search bar */}
        <div class="flex items-center justify-between mt-3 px-3 z-10">
				<div class="hidden relative w-full">
					<input type="text" class="bg-purple-white shadow text-slate-950 rounded-xl border-0 p-3 w-full"
                            placeholder="type search..." />
					<div class="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none"  viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>
			</div>
		


        
      </div>
    </div>
      {/* Your other components */}
      
       <section className=" pt-5 lg:pb-20 lg:pt-[120px] dark:bg-dark">
      <div className="container">
      <div className="flex justify-center">
      <div className="inline-flex items-center overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
  <button
    className={`border-r border-stroke px-4 py-3 text-base font-medium text-white last-of-type:border-r-0 hover:bg-gray-800 hover:text-primary dark:border-dark-3 dark:text-white
    ${
      currentIndex === 0 ? "font-bold bg-orange-500 shadow-xl" : ""
    }`}
    onClick={() => handleSetChange(0)}
  >
    Categories
  </button>
  <button
    className={`border-r border-stroke px-4 py-3 text-base font-medium text-dark last-of-type:border-r-0 hover:bg-gray-800 hover:text-primary dark:border-dark-3 dark:text-white
    ${
      currentIndex === 1 ? "font-bold bg-btn-primary shadow-xl" : ""
    }`}
    onClick={() => handleSetChange(1)}
  >
    Specialties
  </button>
</div>
      </div>
      </div>
      </section>
      <div className="flex overflow-x-scroll pb-4 hide-scroll-bar">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
  {categoriesSets[currentIndex]?.map((category, index) => (
    <div key={index} className="p-2">
      <CategoryCard icon={category.icon} title={category.title} description={category.description} onClick={handleCategoryCardClick}/>
    </div>
  ))}
  </div>
  </div>


    
      {/* top doctors */}
      
      <RecommendedDoctors />

  


      
      
      
      
    </div>

    
  );
};

export default PatientPage;

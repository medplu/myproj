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
import {Doctors }from "./Doctors";

const PatientPage = ({ authUser }) => {
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
  const doctors = [
    { name: "Dr. Gedion", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714413116/ud5hxekv1kjrnye9k3bu.jpg", profession: "Cardiologist" },
    { name: "Dr. Jane", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg", profession: "Dermatologist" },
    { name: "Dr. Christine", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c5_nqwsbg.jpg", profession: "Orthopedic Surgeon" },
    { name: "Dr. Sarah", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713302476/medplus/lqpitkwtbmrkopmf9fn6.jpg", profession: "Pediatrician" },
    { name: "Dr. David", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg", profession: "Psychiatrist" },
    // Add more doctors as needed
  ];
  
  const handleSetChange = (index) => {
    setCurrentIndex(index);
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
    <div className="container mx-auto  bg-gray-900 text-white">
      <div className="card w-full h-80 bg-base-100 shadow-xl image-full">
        <figure><img src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg" alt="Doctor" className="w-full h-48 object-cover" /></figure>
        <div className="">
          <h2 className="card-title">Hello {authUser.username}</h2>
          <p>Welcome, Our Doctors are available</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book</button>
          </div>
        </div>
      </div>
      {/* Your other components */}
      
       <section className="pb-5 pt-5 lg:pb-20 lg:pt-[120px] dark:bg-dark">
      <div className="container">
      <div className="flex justify-center">
      <div className="inline-flex items-center overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
  <button
    className={`border-r border-stroke px-4 py-3 text-base font-medium text-white last-of-type:border-r-0 hover:bg-gray-2 hover:text-primary dark:border-dark-3 dark:text-white
    ${
      currentIndex === 0 ? "font-bold bg-orange-500 shadow-xl" : ""
    }`}
    onClick={() => handleSetChange(0)}
  >
    Categories
  </button>
  <button
    className={`border-r border-stroke px-4 py-3 text-base font-medium text-dark last-of-type:border-r-0 hover:bg-gray-2 hover:text-primary dark:border-dark-3 dark:text-white
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
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
  {categoriesSets[currentIndex]?.map((category, index) => (
    <div key={index} className="p-2">
      <CategoryCard icon={category.icon} title={category.title} description={category.description} />
    </div>
  ))}
  </div>
  </div>


    
      {/* top doctors */}
      
      <Doctors doctors={doctors} />
  


      
      
      
      
    </div>

    
  );
};

export default PatientPage;

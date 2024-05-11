import  {useState, useEffect} from "react";
import { FaSearch, FaUser } from "react-icons/fa";
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
import { Flipper, Flipped } from "react-flip-toolkit";

const doctors = [
  { name: "Dr. Gedion Saning'o", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714413116/ud5hxekv1kjrnye9k3bu.jpg", profession: "Cardiologist" },
  { name: "Dr. Jane Naisula", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg", profession: "Dermatologist" },
  { name: "Dr. Christine Ojwang", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c5_nqwsbg.jpg", profession: "Orthopedic Surgeon" },
  { name: "Dr. Sarah Williams", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713302476/medplus/lqpitkwtbmrkopmf9fn6.jpg", profession: "Pediatrician" },
  { name: "Dr. David Brown", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg", profession: "Psychiatrist" },
  // Add more doctors as needed
];


const services = [
  { id: 1, icon: ambulanceService, title: "Ambulance", description: "" },
  { id: 2, icon: labIcon, title: "Lab Tests", description: "" },
  { id: 3, icon: radIcon, title: "Radiology", description: "" },
  { id: 4, icon: paedImage, title: "Pediatric", description: "" },
  { id: 5, icon: teethIcon, title: "Dental Services", description: "" },
  { id: 6, icon: mentalIcon, title: "Mental Health Counseling", description: "" },
  // Add more services as needed
];



const categories= [
  { icon: ambulanceIcon, description: "", title: "Neurologist"},
  { icon: flaskIcon, description: "" , title: "Cardiologist"},
  {icon: kidneyIcon, description: "", title: "Nephrologist"},
  {icon: pregnancyIcon, description: "", title: "Gynaecologist"},
  {icon: cancerIcon, description: "", title: "Oncologist"},
  {icon: pediatricsImage, description: "", title: "Paediatrician"}


  // Add more services with their respective icons
];

const PatientPage = ({authUser}) => {
  const [flipped, setFlipped] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000); // Change interval time as needed (e.g., 3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, []);

  const handleFlip = (id) => {
    setFlipped(flipped === id ? null : id);
  };
  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      
      <div className="card w-full bg-base-100 shadow-xl image-full">
  <figure><img src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg" alt="Doctor" /></figure>
  <div className="card-body">
    <h2 className="card-title">Hello {authUser.username}</h2>
    <p>Welcome ,Our Doctors are available </p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Consult now</button>
    </div>
  </div>
</div>
      
                
  
  
      {/*  */}
      <div className="flex items-center mb-4 p-8 space-between">
      <div className="flex-1">
      <input type="text" placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />
  </div>
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 ">
    <FaSearch className="text-white" />
  </button>
</div>

<div className="mb-4 glass rounded-box overflow-x-auto">
  <h2 className="text-lg font-bold text-white font-mono mb-2 text-center">Categories </h2>
  <div className="flex flex-nowrap space-x-4 pb-4">
    {/* Category Cards */}
    {categories.map((category, index) => (
      <CategoryCard key={index} icon={category.icon} title={category.title} description={category.description} />
    ))}
  </div>
</div>

      <div className="mb-4 bg-blue-200">
        <h2 className="text-lg font-bold text-white mb-2 font-bold font-mono text-center">Services Offered</h2>
        <Flipper flipKey={flipped}>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <Flipped key={service.id} flipId={service.id}>
                <div className="bg-blue-200 rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleFlip(service.id)}>
                  {flipped === service.id ? (
                    <div>
                      <h3 className="text-lg font-bold text-white">Flipped Service Title</h3>
                      <p className="text-gray-600 mt-2">Flipped Service Description</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-bold text-blue-600">{service.title}</h3>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                  )}
                </div>
              </Flipped>
            ))}
          </div>
        </Flipper>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white text-center mb-2 ">Top Doctors</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 p-4">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-lg shadow-md flex-shrink-0"
              >
                <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-600">{doctor.name}</h3>
                  <p className="text-gray-600 mt-2">{doctor.profession}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ name, image, profession }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-bold text-blue-600">{name}</h3>
      <p className="text-gray-600 mt-2">{profession}</p>
    </div>
  )
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-2">
        <img src={icon} alt={title} className="w-8 h-8 mr-2" />
        <h3 className="text-lg font-bold text-blue-600">{title}</h3>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
};



export default PatientPage;
import { useEffect, useState } from 'react';

const CategoryCard = ({ icon, title, description, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:h-36 bg-gray-800 rounded-2xl text-green-600 shadow hover:shadow-md cursor-pointer p-2 transition ease-in duration-300 ${
        loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
      onClick={() => onClick(title)}
    >
      <img 
        src={icon} 
        alt={title} 
        className="w-10 h-10 mb-2 animate-pulse sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" 
      />
      <div className="text-center">
        <h3 className="text-xs font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

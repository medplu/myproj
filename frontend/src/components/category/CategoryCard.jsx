import { useEffect, useState } from 'react';

const CategoryCard = ({ icon, title, description }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`flex flex-col items-center  overflow-x-scroll pb-5 hide-scroll-bar p-2 bg-gray-800 border-orange-500 shadow-2xl rounded-xl transition-all duration-500 ${loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <img src={icon} alt={title} className="w-10 h-10 mb-2 animate-pulse sm:w-20 sm:h-20 md:w-24 md:h-24" />
      <div className="text-center">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

import { useEffect, useState } from 'react';

const CategoryCard = ({ icon, title, description }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`flex flex-col items-center p-4 border-b border-gray-300 transition-all duration-500 ${loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <img src={icon} alt={title} className="w-20 h-20 mb-2 animate-pulse" />
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

import { useEffect, useState } from 'react';

const CategoryCard = ({ icon, title, description, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center w-20 h-20 bg-gray-800 rounded-2xl text-green-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 transition ease-in duration-300 ${
        loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
      onClick={() => onClick(title)}
    >
      <img src={icon} alt={title} className="w-10 h-10 mb-2 animate-pulse sm:w-20 sm:h-20 md:w-24 md:h-24" />
      <div className="text-center">
        <h3 className="text-xs font-bold text-white">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

import React, { useState, useEffect } from 'react';

function DarkVariantCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = activeIndex === 2 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const images = [
    "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993049/image3_b7pxgc.jpg",
    "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993048/image2_l4qa43.jpg",
    "https://res.cloudinary.com/dws2bgxg4/image/upload/v1715100264/cdb1reaaf5jwvcnx2z9c.jpg"
  ];

  const slides = [
    {
      label: "Welcome to Medplus Health",
      content: "Connecting Patients with Trusted Medical Professionals."
    },
    {
      label: "Join a Network of Medical Professionals",
      content: "Connect, Collaborate and share knowledge to enhance overall health"
    },
    {
      label: "Medplus Health",
      content: "Bridging Health-Care."
    }
  ];

  const handleSlideTo = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? 2 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === 2 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

return (
  <div
    id="carouselDarkVariant"
    className="relative"
    data-twe-carousel-init
    data-twe-ride="carousel"
  >
    {/* Carousel indicators */}
    <div
      className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
      data-twe-carousel-indicators
    >
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => handleSlideTo(index)}
          className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${
            index === activeIndex ? 'opacity-100' : ''
          }`}
          aria-current={index === activeIndex ? 'true' : 'false'}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>

    {/* Carousel items */}
    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`relative float-left -mr-[100%] w-full ${
            index === activeIndex ? '!transform-none opacity-100' : 'hidden !transform-none opacity-0'
          } transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none`}
          data-twe-carousel-fade
          data-twe-carousel-item
          data-twe-carousel-active={index === activeIndex ? true : false}
        >
          <img
            src={images[index]}
            className="block w-full"
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-x-[15%] bottom-5 py-5 text-center mb-6 text-white md:block">
            <h5 className="text-xl">{slides[index].label}</h5>
            <p>{slides[index].content}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Carousel controls - prev item */}
    <button
      className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      onClick={handlePrev}
    >
      <span className="inline-block h-8 w-8 dark:grayscale">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </span>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
    </button>

    {/* Carousel controls - next item */}
    <button
      className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      onClick={handleNext}
    >
      <span className="inline-block h-8 w-8 dark:grayscale">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </span>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
    </button>

    {/* Buttons */}
    <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-4 px-6 pb-6">
      <button
        className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-blue-600 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
        onClick={handlePrev}
      >
        Lern More
      </button>
      <button
        className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-orange-500 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
        onClick={handleNext}
      >
        Join us
      </button>
    </div>
  </div>
);
}
export default DarkVariantCarousel;

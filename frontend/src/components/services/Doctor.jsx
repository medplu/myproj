import Slider from 'react-slick';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const doctors = [
    { id: 1, name: "Dr. Gedion", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714413116/ud5hxekv1kjrnye9k3bu.jpg", profession: "Cardiologist", Bio: "Dr. Gedion is a skilled surgeon" },
    { id: 2, name: "Dr. Jane", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg", profession: "Dermatologist" , Bio: "Dr. Jane is a skilled surgeon"},
    { id: 3, name: "Dr. Christine", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c5_nqwsbg.jpg", profession: "Orthopedic Surgeon" , Bio: "Dr. Christine is a skilled surgeon"},
    { id: 4, name: "Dr. Sarah", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713302476/medplus/lqpitkwtbmrkopmf9fn6.jpg", profession: "Pediatrician", Bio: "Dr. Sarah is a skilled surgeon"},
    { id: 5, name: "Dr. David", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg", profession: "Psychiatrist", Bio: "Dr. David is a skilled surgeon"},
    // Add more doctors as needed
  ];

export function Doctors() {
  return (
    <Slider {...carouselSettings}>
      {doctors.map((doctor, index) => (
        <div key={index} className="p-2">
          <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="flex flex-col mr-4 pb-2"
            >
              <Avatar
                size="sm"
                variant="circular"
                src={doctor.image}
                alt={doctor.name}
                className="rounded-sm w-32 h-32 sm:w-16 sm:h-16 object-cover"
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="white">
                    {doctor.name}
                  </Typography>
                </div>
                <Typography color="white">{doctor.profession}</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <div className="5 flex items-center gap-0">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <Link to={`/doctors/${doctor.id}`}>
            <button className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition p-4 duration-300">Book Appointment</button>
            </Link>
            </CardBody>
          </Card>
        </div>
      ))}
    </Slider>
  );
}

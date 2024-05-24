import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Canvg } from 'canvg';
import { FaHospitalSymbol } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const PatientsPage = () => {
  const [userLocation, setUserLocation] = useState(null);

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
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, []);

  const iconToDataURL = (IconComponent, size, color) => {
    const svg = ReactDOMServer.renderToStaticMarkup(<IconComponent size={size} color={color} />);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const v = Canvg.fromString(ctx, svg);
    v.start();
    return canvas.toDataURL();
  };

  const renderMap = () => {
    if (window.google && window.google.maps && userLocation) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 12
      });

      // Add a marker for the user's location
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
        icon: iconToDataURL(CiLocationOn, 48, 'blue')
      });

      // TODO: Fetch the clinics from your API and add a marker for each one
      // For now, we'll just add a single marker at a hard-coded location
      new window.google.maps.Marker({
        position: { lat: -1.308076, lng: 36.733454 }, // Replace with actual clinic location
        map: map,
        title: "Ngongo", // Replace with actual clinic name
        icon: iconToDataURL(FaHospitalSymbol, 48, 'red') // Replace 48 with the desired size and 'red' with the desired color
      });
    }
  };

  const loadGoogleMapsScript = () => {
  if (!window.google || !window.google.maps) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
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

  return (
    <div className="flex-grow h-screen">
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default PatientsPage;

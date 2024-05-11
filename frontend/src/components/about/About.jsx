import React from "react";
import MedicalCommunityIcon from "../../assets/icons8-community-48.png";
import ConsultationIcon from "../../assets/icons8-consultation-100.png";
import LibraryIcon from "../../assets/icons8-library-64.png";
import OrganizationalToolsIcon from "../../assets/icons8-tools-100.png";
import BusinessSegmentIcon from "../../assets/icons8-portfolio-53.png";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <section className="dark:bg-dark lg:pb-[90px] lg:pt-[120px] bg-blue-200">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-4 max-w-[510px] text-center lg:mb-20">
              <span className="block text-lg font-semibold text-slate-950">
                Our Services
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/">
            <ServiceCard
              title="Medical Community"
              details="Join our vibrant medical community to connect with fellow students, professionals, and innovators in healthcare."
              icon={MedicalCommunityIcon}
              link="Learn More"
            />
          </Link>
          <Link to="/services">
            <ServiceCard
              title="Patient Consultations"
              details="Get access to expert medical advice and consultations from our network of healthcare professionals."
              icon={ConsultationIcon}
              link="Learn More"
            />
          </Link>
          <Link to="/library">
            <ServiceCard
              title="Rich Library for Students"
              details="Access a comprehensive library of medical resources, textbooks, and research materials to enhance your learning."
              icon={LibraryIcon}
              link="Learn More"
            />
          </Link>
          <Link to="/doctors">
            <ServiceCard
              title="Organizational Tools for Doctors"
              details="Streamline your practice with our suite of organizational tools designed for healthcare providers."
              icon={OrganizationalToolsIcon}
              link="Learn More"
            />
          </Link>
          <Link to="/business">
            <ServiceCard
              title="Business Segment for Entrepreneurs"
              details="Explore opportunities and resources for healthcare entrepreneurs and innovators to grow their ventures."
              icon={BusinessSegmentIcon}
              link="Learn More"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;

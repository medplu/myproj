import React from 'react';
import Navbar from '../../components/nav/Navbar';
import ContactSection from '../../components/contact/Contact';
import Hero from '../../components/hero/Hero';
import About from '../../components/about/About';
import Blogs from '../../components/blogs/Blogs';
import Footer from '../../components/footer/Footer';

const Landing = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <ContactSection />
      <Navbar />
      <Hero />
      <About />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Landing;

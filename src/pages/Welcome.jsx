
// import { motion } from 'framer-motion';
// import Modal from '../components/Modal';
import Joyride from 'react-joyride';
import {  useEffect, useState } from 'react';
import HeaderSection from '../components/HeaderSection';
import ScrollIcon from '../components/ScrollIcon';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';

export default function WelcomePage() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [startTour, setStartTour] = useState(false);
  const [showIcon,setShowIcon] = useState(true);

  useEffect(() => {
    
    // Scroll to the top of the page when the component mounts (on page load)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    function handleScroll(){
      if(window.scrollY>100){
        setShowIcon(false);
      }
      else{
        setShowIcon(true)
      }
    }

    window.addEventListener('scroll',handleScroll);
    
    return () => {
      // Optionally, reset scroll restoration to default when the component unmounts
      window.history.scrollRestoration = 'auto';
    };
    

  }, []);
  // Tour steps targeting elements in different components
  const tourSteps = [
    {
      target: '#welcome-header',  // Element in Header component
      content: 'This is the website logo.',
    },
     {
       target: '#challenges',  // Element in Content component
       content: 'Here is the main content area.',
     },
    // {
    //   target: '.footer-info',  // Element in Footer component
    //   content: 'This is the footer section.',
    // },
  ];

  const startWebsiteTour = () => {
    setModalOpen(false)
    setStartTour(true);  // Start the tour
  };
  return (
    <>
      <HeaderSection isModalOpen={isModalOpen} setModalOpen={setModalOpen} onClick={startWebsiteTour}/>
      {showIcon && <ScrollIcon/>}

      <main id="welcome-content">
        <SearchBar/>
        <div className='welcome-statement'>
          <h1>Hiya, Let&apos;s Explore!</h1>
          
        </div>
        <CardContainer/>
        

      </main>
      <Outlet/>
      <Footer/>
      {startTour && (
        <Joyride
          steps={tourSteps}
          run={startTour}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          styles={{
            options: {
              zIndex: 10000,
              width:'auto'
            },
          }}
        />
      )}
    </>
  );
}

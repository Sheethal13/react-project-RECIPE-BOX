
// import { motion } from 'framer-motion';
// import Modal from '../components/Modal';
import Joyride from 'react-joyride';
import {  useEffect, useState } from 'react';
import HeaderSection from '../components/HeaderSection';
import ScrollIcon from '../components/ScrollIcon';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CardContainer from '../components/CardContainer';
import DataContextProvider from '../store/DataContext';

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
    <DataContextProvider>
      <HeaderSection isModalOpen={isModalOpen} setModalOpen={setModalOpen} onClick={startWebsiteTour}/>
      {showIcon && <ScrollIcon/>}

      <main id="welcome-content">
        <SearchBar/>
        <div className='welcome-statement'>
          <h1>Hiya, Let&apos;s Explore!</h1>
          
        </div>
        <CardContainer/>
        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

      </main>
      <Outlet/>
      <footer>
        <p>&copy; 2023 KuchBhi</p>
      </footer>
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
    </DataContextProvider>
    </>
  );
}

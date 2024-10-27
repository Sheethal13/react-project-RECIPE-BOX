
// import { motion, spring, useScroll, useTransform } from 'framer-motion';
// import Modal from '../components/Modal';
import Joyride from 'react-joyride';
import { useEffect, useState } from 'react';
import HeaderSection from '../components/HeaderSection';
import ScrollIcon from '../components/ScrollIcon';
import { Outlet } from 'react-router-dom';

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
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

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

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
      <Outlet/>
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

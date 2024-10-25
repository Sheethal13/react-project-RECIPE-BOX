//import { useState } from "react"
import Modal from "./Modal"
import { Link } from 'react-router-dom';
import { motion,useScroll,useTransform } from "framer-motion";
import NavBar from "./NavBar";

export default function HeaderSection({isModalOpen,setModalOpen,onClick}){

    //const [isModalOpen,setModalOpen]=useState(true);
    const {scrollY}=useScroll();
    const yText = useTransform(scrollY, [0,200,300,500], [0,30,30,200]);
    const scaleText = useTransform(scrollY,[0,300], [1,1.2]);

    return (
        <>
        <header id="welcome-header">
        {isModalOpen && 
        (<Modal title="Welcome" onClose={() => setModalOpen(false)}>
          
          <div className='modal-content'>
            <p>Hello There! Welcome to the Recipe Finder! 
              Discover a variety of delicious recipes tailored to your ingredients. 
              Ready for a quick tour of the website?
            </p>
          </div>
          
          <div className='modal-actions'>
          
          <motion.button 
        whileHover={{scale:1.1}}
        transition={{type:'spring', stiffness:500}}
         onClick={() => setModalOpen(false)} className="btn-negative">
                  No, Thank you!
          </motion.button>

          <motion.button 
        whileHover={{scale:1.1}}
        transition={{type:'spring', stiffness:500}}
         onClick={onClick} className="btn-positive">
                 Yes, I would love to!
          </motion.button>

          </div>
          </Modal>)
        }
        <NavBar/>
        <motion.div 
        style={{scale:scaleText, y:yText}}
        id="welcome-header-content">
          <h1 id="header-heading">RECIPE BOX!</h1>
          <h2 id="header-tagline">What to cook today? Whip Up Magic with What’s in Your Kitchen</h2>
          <div className='user-actions'>
            <motion.button
            whileHover={{scale:1.1}}
            transition={{type:'spring',stiffness:500}}>
              Explore
            </motion.button>
            <motion.button
            whileHover={{scale:1.1}}
            transition={{type:'spring',stiffness:500}}>
              <Link className="cta-link" to="/challenges">
            Login
          </Link>
          </motion.button>
          <motion.button
            whileHover={{scale:1.1}}
            transition={{type:'spring',stiffness:500}}>
              <Link className="cta-link" to="/challenges">
            Signup
          </Link>
          </motion.button>
          </div>
          
        </motion.div>
        
      </header>
        </>
    )
}
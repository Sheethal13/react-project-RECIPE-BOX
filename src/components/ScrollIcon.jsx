import { motion } from "framer-motion";
import downIcon from '../assets/icons8-down-button-48.png';

export default function ScrollIcon(){
    function handleScrollNext(){
        const nextSection = document.getElementById('welcome-content');
        nextSection.scrollIntoView({behavior: 'smooth'});
    }

    return(
        <>
        <motion.div
        onClick={handleScrollNext}
        style={{cursor:PointerEvent,textAlign:"center"}}
        animate={{y:[0,10,0]}}
        transition={{
            repeat:Infinity,
            repeatType:"reverse",
            duration:1
        }}
        >
            <img src={downIcon} alt="downicon"  />
        </motion.div>
        </>
    )
}
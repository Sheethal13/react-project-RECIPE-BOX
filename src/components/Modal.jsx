import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
export default function Modal({ title, children, onClose }) {



  function getIcon(title){
    const name = title.toLowerCase();
    if(!name){
      return null;
    }
    return <motion.img id='icon-modal'
    src={require(`../assets/${name}.png`)} 
    initial={{ opacity: 1 }}
    whileHover={{ scale: 1.2, rotate: 360 }}  // Scale and rotate on hover
    transition={{ duration: 0.5 }}  // Animation duration
    alt={`${name} icon`}/>;
    
  }
  //const hiddenAnimationState ={opacity:0, y: 30};
  return createPortal(
    <>
    
      <div className="backdrop" onClick={onClose} />
      <motion.dialog 
      variants={{
        hidden: {opacity:0, y: 30},
        visible: {opacity:1, y: 0}
      }}
      initial = "hidden"
      animate = "visible"
      exit="hidden"
      open className="modal"
      style={title === 'Sign Up' ? { top: '10%' } : {}}>
        {getIcon(title)}
        <h2>{title}</h2>
        {children}
        
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}

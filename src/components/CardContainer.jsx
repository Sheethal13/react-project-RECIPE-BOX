import {motion,AnimatePresence} from 'framer-motion';
import Card from '../components/Card';
import img from '../assets/Cooking.gif';
import { useContext, useState } from 'react';
import { DataContext } from '../store/DataContext';

export default function CardContainer(){
  const {filteredDataset}=useContext(DataContext);
  const [currentIndex,setCurrentIndex] = useState(0);
  const maxCards=9;
  const recipeData = filteredDataset.slice(currentIndex,currentIndex+maxCards);

  function handleNext(){
    if(currentIndex+maxCards < filteredDataset.length){
      setCurrentIndex(currentIndex+maxCards);
    }
  }

  function handlePrev(){
    if(currentIndex-maxCards >= 0){
      setCurrentIndex(currentIndex-maxCards);
    }
  }
    return (
        <div className='recipes-card'>
        <AnimatePresence mode='wait'>
        {recipeData.length > 0 && (
          <motion.ol key="list" 
          initial={{opacity:0, y:-20}}
          animate={{opacity:1, y:0}}
          exit={{y:-30, opacity:0}} className="recipes-card">
            <AnimatePresence>
            {recipeData.map((recipe) => (
              <Card
                key={recipe.id}
                imgSrc={recipe.imgSrc || img}
                title={recipe.itemName}
                ingredients={recipe.ingredients}
              />
            ))}
            </AnimatePresence>
          </motion.ol>
        )}
        {recipeData.length === 0 && <motion.p 
        initial={{opacity:0, y:-20}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-20}}
        key="fallback">No challenges found.</motion.p>}
        </AnimatePresence>
        <div className='card-container-buttons'>
        {currentIndex - maxCards >= 0 && (
        <button onClick={handlePrev}>Prev</button>
        )}
        {currentIndex + maxCards < filteredDataset.length && (
        <button onClick={handleNext}>Next</button>
        )}
        </div>
        </div>
    );
}
import {  useRef, useState } from 'react';
import {  stagger, useAnimate } from 'framer-motion';
import Footer from "../components/Footer";
import profile from '../assets/profile.png';
import ProfileSection from "../components/ProfileSection";
import { handleLogout, addRecipe } from '../firebase.js';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function PublishRecipe() {
  const title = useRef();
  const description = useRef();
  const ingredients = useRef();
  const imageLink = useRef();
  const sourceLink  = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const [scope, animate] = useAnimate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
    const userId = location.state?.userId;
    if(!userId){
        alert('please log in to view favorites');
    }
    const [isSectionOpen,setIsSectionOpen] = useState(false);
    function toggleSection(){
        setIsSectionOpen(!isSectionOpen);
    }
  function handleSubmit(event) {
    event.preventDefault();
    const ingredientsValue = ingredients.current.value;
    const ingredientsArray = ingredientsValue.split('\n').map((line) => {
      const [name, quantity] = line.split('-').map((item) => item.trim());
      return { name, quantity };
    });
    const descriptionValue= description.current.value;
    const steps = descriptionValue.split('\n').map(step => step.trim());
    const newRecipe = {
      id: Math.random().toString(36).substring(2, 10),
      itemName: title.current.value,
      recipe: steps,
      ingredients: ingredientsArray,
      imgSrc: imageLink.current.value,
      source: sourceLink.current.value
    };

    if (
      !newRecipe.itemName.trim() ||
      !newRecipe.ingredients ||
      !newRecipe.recipe ||
      !newRecipe.imgSrc 
    ) {
      animate('input, textarea',{ x:[-10,0,10,0]},
        {type:'spring', transition:0.2, delay:stagger(0.05)});
      return;
    }

    addRecipe(newRecipe);
    resetForm();
  }
  function resetForm(){
    title.current.value = '';
    description.current.value = '';
    ingredients.current.value = '';
    imageLink.current.value = '';
    sourceLink.current.value = '';
  }

  return (
    <>
    <nav className={ "fixed-nav"}>
        <div className="navbar-left">
        <p className="navbar-logo">
            <Link to="/challenges">
            Logo
            </Link>
        </p>
            <h1 className="navbar-heading">
                RECIPE BOX 
            </h1>
        </div>
        {isSectionOpen && 
        <ProfileSection toggleSection={toggleSection}/>
        }
        {!isSectionOpen &&(
            <>
        <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
        </div>
        <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li>Origin</li>
        <li>Contact</li>
        {!userId && (<li><NavLink to='login'>Log In</NavLink></li>)}
        {!userId && (<li><NavLink to='signup'>Sign Up</NavLink></li>)}
        {userId && <li onClick={handleLogout} className="logout">Log Out</li>}
        <li>
            <img src={profile} style={{'width':'30px'}} alt="acc" onClick={toggleSection}/>
        </li>
        </ul>
        </>)}
        </nav>
      <div className='whole-container'>
        <h1>Publish New Recipe</h1>
      <div className='form-container'>
        <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Recipe Title</label>
          <input ref={title} type="text" name="title" id="title" placeholder='Enter yor recipe name'/>
        </p>
        <p>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea ref={ingredients} name="ingredinets" id="ingredients" placeholder='enter in the format ingredient name - quantity (one per line)'/>
        </p>
        <p>
          <label htmlFor="description">Steps To Prepare</label>
          <textarea ref={description} name="description" id="description" placeholder='List the steps one by one (each step on a new line)'/>
        </p>

        <p>
          <label htmlFor="imageLink">Image URL</label>
          <input ref={imageLink} type="url" name="imageLink" id="imageLink" placeholder='Paste the image url'/>
        </p>

        <p>
          <label htmlFor="sourceLink">Source URL</label>
          <input ref={sourceLink} type="url" name="sourceLink" id="sourceLink" placeholder='Paste the url of the recipe if already in any website'/>
        </p>
        

        <p className="new-challenge-actions">
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
          <button type='submit'>Add Recipe</button>
        </p>
      </form>
      </div>
      </div>
      <Footer/>
    </>
  );
}

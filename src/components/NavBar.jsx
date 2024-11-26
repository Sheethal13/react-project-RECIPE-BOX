//import { useMotionValue, useScroll } from "framer-motion";
import {  useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import profile from '../assets/profile.png';
import ProfileSection from "./ProfileSection";

export default function NavBar(){
    const [isFixed,setIsFixed]=useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSectionOpen,setIsSectionOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    function toggleSection(){
        setIsSectionOpen(!isSectionOpen);
    }
    useEffect(()=>{
        
        function handleScroll(){
            if(window.scrollY>800){
                setIsFixed(true);
            }
            else{
                setIsFixed(false)
            }
          }
      
          window.addEventListener('scroll',handleScroll);

          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    },[])

    return(
        <nav className={ isFixed?  "fixed-nav" : "nav"}>
        <div className="navbar-left">
        <p className="navbar-logo">
            <Link to="/challenges">
            Logo
            </Link>
        </p>
        {isFixed &&(
            <h1 className="navbar-heading">
                RECIPE BOX
            </h1>
        )}
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
        <li><NavLink to='login'>Log In</NavLink></li>
        <li><NavLink to='signup'>Sign Up</NavLink></li>
        <li>
            <img src={profile} style={{'width':'30px'}} alt="acc" onClick={toggleSection}/>
        </li>
        </ul>
        </>)}
        </nav>
        
    )
}
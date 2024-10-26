//import { useMotionValue, useScroll } from "framer-motion";
import {  useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function NavBar(){
    const [isFixed,setIsFixed]=useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
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
        {/* Hamburger icon for mobile */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
        </div>
        {/* Right side: Menu items (conditionally shown on mobile) */}
        <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li>Logo</li>
        <li>Logo</li>
        <li>Logo</li>
        <li>Logo</li> 
        </ul>
        </nav>
        
    )
}
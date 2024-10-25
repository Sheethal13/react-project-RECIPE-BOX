//import { useMotionValue, useScroll } from "framer-motion";
import {  useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function NavBar(){
    const [isFixed,setIsFixed]=useState(false);
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
        <ul className="nav-list"> 
        <li id="something-left">
            <Link to="/challenges">
            Logo
            </Link>
        </li>
        <li>Logo</li>
        <li>Logo</li>
        <li>Logo</li>
        <li>Logo</li>    
        </ul>
        </nav>
    )
}
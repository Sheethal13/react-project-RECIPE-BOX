import {  useLocation } from "react-router-dom";
import img from '../assets/Cooking.gif';
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { DataContext } from "../store/DataContext";
import Footer from "../components/Footer";
import profile from '../assets/profile.png';
import ProfileSection from "../components/ProfileSection";
import { fetchFav } from "../firebase";
import Card from "../components/Card";



export default function Favorites(){
    const [isOpen, setIsOpen] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    const [isSectionOpen,setIsSectionOpen] = useState(false);
    function toggleSection(){
        setIsSectionOpen(!isSectionOpen);
    }
    const location = useLocation();
    const userId = location.state?.userId;
    if(!userId){
        alert('please log in to view favorites');
    }
    const {dataset} = useContext(DataContext);
    useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const favorites = await fetchFav(userId);
            console.log("Fetched Favorites:", favorites);
    
            const ids = favorites ? Object.values(favorites) : [];
            setFavoriteIds(ids);
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        };
    
        fetchFavorites();
      }, [userId]);
      console.log(favoriteIds);
    const favRecipes = dataset.filter((menu) => favoriteIds.includes(menu.id));
    return(
        <div>
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
        <li><NavLink to='login'>Log In</NavLink></li>
        <li><NavLink to='signup'>Sign Up</NavLink></li>
        <li>
            <img src={profile} style={{'width':'30px'}} alt="acc" onClick={toggleSection}/>
        </li>
        </ul>
        </>)}
        </nav>

            <div className="fav-container">
                <h1 className="title-fav">Favorites</h1>
                <div className='recipes-card'>
                {favRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                imgSrc={recipe.imgSrc || img}
                title={recipe.itemName}
                ingredients={recipe.ingredients}
                id={recipe.id}
              />
            ))}
                </div>
            </div>
        
        <Footer/>
        </div>
    )
}
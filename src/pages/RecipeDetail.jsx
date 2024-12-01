import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { DataContext } from "../store/DataContext";
import Footer from "../components/Footer";
import profile from '../assets/profile.png';
import ProfileSection from "../components/ProfileSection";
import { auth , handleLogout} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RecipeDetail(){
    
    const id = useParams().id;
    const {dataset} = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isSectionOpen,setIsSectionOpen] = useState(false);
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            // User is logged in
            setUser(currentUser);
            console.log("User logged in:", currentUser);
        } else {
            // User is logged out
            setUser(null);
            console.log("User not logged in");
        }
        });
        
        // Cleanup the listener on component unmount
        return () => unsubscribe();

    },[]);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    function toggleSection(){
        setIsSectionOpen(!isSectionOpen);
    }
    const recipe= dataset.find(r=> r.id===id);
    if(!recipe){
        return(
            <div>Recipe not found</div>
        )
    }
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
                RECIPE BOX - {recipe.itemName}
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
        {!user && (<li><NavLink to='login'>Log In</NavLink></li>)}
        {!user && (<li><NavLink to='signup'>Sign Up</NavLink></li>)}
        {user && <li onClick={handleLogout} className="logout">Log Out</li>}

        <li>
            <img src={profile} style={{'width':'30px'}} alt="acc" onClick={toggleSection}/>
        </li>
        </ul>
        </>)}
        </nav>

        <div className="header-recipe">
            <img src={recipe.imgSrc} alt="img"  />
            <h1>{recipe.itemName}</h1>
        </div>
        <div className="body-recipe">
            <div className="ingredients-recipe">
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((item, index) =>
                    <li key={index}>
                           <label>
                            <input type="checkbox" />
                            {item.name} - {item.quantity} 
                        </label>
                    </li>)}
                </ul>
            </div>
            <div className="recipe-recipe">
            <h2>Steps to cook</h2>
                <ol>
                    {recipe.recipe.map((step,index) =>
                    <li key={index}>
                            {step} 
                    </li>)}
                </ol>
            </div>
            <div>
                <p>To view detailed recipe, click here : <span><Link to={recipe.source}>go to source</Link></span></p>
            </div>
        </div>
        <Footer/>
        </div>
    )
}
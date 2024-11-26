import { useContext, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { DataContext } from "../store/DataContext";
import Footer from "../components/Footer";

export default function RecipeDetail(){
    
    const id = useParams().id;
    const {dataset} = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
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
        {/* Hamburger icon for mobile */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
        </div>
        {/* Right side: Menu items (conditionally shown on mobile) */}
        <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li>Origin</li>
        <li>Contact</li>
        <li><NavLink to='login'>Log In</NavLink></li>
        <li><NavLink to='signup'>Sign Up</NavLink></li>
        <li>Logo</li>
        </ul>
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
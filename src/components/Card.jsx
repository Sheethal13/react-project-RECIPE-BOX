import favorite from '../assets/favorite.png'
import comment from '../assets/comment.png'
import view from '../assets/icons8-view-48.png'
import send from '../assets/icons8-send-26.png'
import isFav from '../assets/icons8-favorite-26.png'
import {onAuthStateChanged} from 'firebase/auth';
import { Link } from 'react-router-dom'
import {auth, addFav, removeFav, fetchFav} from '../../src/firebase'
import { useState, useEffect } from 'react'


export default function Card({imgSrc,title,ingredients,id}){

    const [user,setUser] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState([]);

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
        const userId = user? user.uid : null;
        const fetchFavorites = async () => {
            if (userId) {
              try {
                const favorites = await fetchFav(userId);
                const ids = favorites ? Object.values(favorites) : [];
                setFavoriteIds(ids);
              } catch (error) {
                console.error("Error fetching favorites:", error);
              }
            }
        }
      
          fetchFavorites();
          
        // Cleanup the listener on component unmount
        return () => unsubscribe();

    },[user]);
    
    const toggleFavorite = () => {
        if (!user) {
          alert('Please log in to add to favorites!');
          return;
        }
        if (favoriteIds.includes(id)) {
            
          removeFav(user.uid, id);
        } else {
          addFav(user.uid, id);
        }
      };
    return (
        <div className="card">
            <div className="card-image">
                <img src={imgSrc} alt="something"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    <ul>
                        {ingredients.map((item,index) => (
                            <li key={index}>
                                {item.name} - {item.quantity}
                            </li>
                        ))}
                    </ul>
                </p>
                <div className="card-actions">
                    <div className='card-actions-left'>
                        {favoriteIds.includes(id) ? (<img src={isFav} alt='favorite' onClick={toggleFavorite}/>): (<img src={favorite} alt='favorite' onClick={toggleFavorite}/>)}
                        <img src={comment} alt='comment'/>
                        <img src={send} alt='share' style={{'width':'40px'}}/>
                    </div>
                        <Link to={`/recipes/${id}`}><img src={view} alt='view'/></Link>
                </div>
            </div>
        </div>
    );
}
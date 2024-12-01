import profile from '../assets/profile.png';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {auth} from '../../src/firebase'

export default function ProfileSection({toggleSection}){
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
  const userId = user? user.uid : null;

    return(<>
        <div className="profile-section">
            <div className="profile-header">
                <div className="profile-header-title">
                <img src={profile} style={{'width':'50px'}} alt="acc" onClick={toggleSection}/>
                <h1>My Account</h1>
                </div>
            

            <button onClick={toggleSection} className="close-button">
            ✕ 
            </button>
            </div>
            {user &&
            <div>
                <h1>Hi !</h1>
                <div className='user-details'>
                    <h2>{user.email}</h2>
                </div>
                <Link to="my-favorites" state={{userId}}><h2>My Favorites</h2></Link>
                <Link to="publish-new" state={{userId}}><h2>Publish New Recipe</h2></Link>
            </div>
            }
            {(!user) && 
            <div className="profile-actions">
            <p>It seems that you're not logged In.</p>
            <motion.button
            whileHover={{scale:1.1}}
            transition={{type:'spring',stiffness:500}}
            onClick={toggleSection}>
              <Link className="cta-link" to="login" style={{'color':'green'}}>
            Login
          </Link>
          </motion.button>
          <h1 style={{'textAlign':'center'}}>OR</h1>
          <motion.button
            whileHover={{scale:1.1}}
            transition={{type:'spring',stiffness:500}}
            onClick={toggleSection}>
              <Link className="cta-link" to="signup" style={{'color':'green'}}>
            Signup
          </Link>
          </motion.button>
          </div>}
        </div>
        </>)
}
import React, { useState } from 'react';
import Modal from '../components/Modal'
import { Form, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, createUserWithEmailAndPassword, writeUserData } from '../../src/firebase';
import Error from '../components/Error';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error,setError] = useState('');
  const [isError,setIsError] = useState(false);
  
  const [isModalOpen,setIsModalOpen] = useState(true);

  const navigateHere = useNavigate();

  function handleCloseModal(){
      setIsModalOpen(false);
      navigateHere('/');
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      setIsError(true);
      return console.error("Error signing up:password mismatch");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      
      await writeUserData(user.uid, user.email, username);
      
      navigateHere('/');
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error);
    }
  };

  return (
    <>
    {isModalOpen && (
        <Modal title="Sign Up" onClose={handleCloseModal} >
          <div className="login-form">
          <Form method="post" onSubmit={handleSignup}>
                <div className="labels">
                {error && <Error error={(error.message.split('auth/')[1]).replace(/\)./, '') || 'Some error occured!'}/>}
                {isError && <Error error="Error signing up:password mismatch"/>}
                <label>Email Id</label>
                <input type="email" 
                className="form-inputs"
                htmlFor="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your emailid" required/>
                <label>Username</label>
                <input type="text" 
                className="form-inputs"
                htmlFor="name" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username" required/>
                <label>Password</label>
                <input type="password" 
                className="form-inputs"
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required/>
                <label>Confirm Password</label>
                <input type="password" 
                className="form-inputs"
                name="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password" required/>
                </div>
            
          <div className='modal-actions'>
          
          <motion.button 
        whileHover={{scale:1.1}}
        transition={{type:'spring', stiffness:500}}
         onClick={handleCloseModal} className="btn-negative">
                  Cancel
          </motion.button>

          <motion.button type="submit"
        whileHover={{scale:1.1}}
        transition={{type:'spring', stiffness:500}}
         className="btn-positive" onClick={handleSignup}>
                 Sign Up
          </motion.button>

          </div>
          
          </Form>
          <p className='para-center'>Already have an account?  <Link to='../login'>Log In</Link></p>
          </div>
        </Modal>
    )}
    </>
)
}

export default Signup;

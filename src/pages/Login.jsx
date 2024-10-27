import { useState } from "react";
import Modal from '../components/Modal'
import { Form, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, signInWithEmailAndPassword, writeLoginData } from '../../src/firebase';
import Error from '../components/Error';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen,setIsModalOpen] = useState(true);

    const [error,setError] = useState('');


    const navigateHere = useNavigate();

    function handleCloseModal(){
        setIsModalOpen(false);
        navigateHere('/');
    }

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            // Call writeLoginData with user ID and email
            writeLoginData(user.uid, user.email);
            navigateHere('/');
          })
          .catch((error) => {
            console.error("Error logging in:", error);
            setError(error);

          });
      };

    return(<>
    {/*console.log('ikkk')*/}
    {isModalOpen && (
        <Modal title="Log In" onClose={handleCloseModal} >
            <div className="login-form">
            <Form method="post" onSubmit={handleLogin}>
                <div className="labels">
                {error && <Error error={(error.message.split('auth/')[1]).replace(/\)./, '') || 'Some error occured!'}/>}

                <label>Email Id</label>
                <input type="email" 
                className="form-inputs"
                htmlFor="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your emailid" required/>
                <label>Password</label>
                <input type="password"
                className="form-inputs"
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required/>
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
         className="btn-positive" onClick={handleLogin}>
                 Log In
          </motion.button>

          </div>
          </Form>
          <p className="para-center">New user? <Link to='../signup'>Sign Up</Link></p>
          </div>
        </Modal>
    )}
    </>)
}
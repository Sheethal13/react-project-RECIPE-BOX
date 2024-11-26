import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    const [feedback, setFeedback] = useState('');

    function handleFeedback(e){
        e.preventDefault();
        if(feedback){emailjs.send(
            'service_tv5jd16',
            'template_3uenzyl',
            {message:feedback},
            'i0t_IL7mRig2EGJVS'
        ).then((response) =>{
            console.log(response, 'sent');
            alert('Thank you for your message.');
            setFeedback('')
        }).catch((error) => {
            console.error(error);
            alert('Failed to send the message, please try again later.')
        })}
        else{
            alert('Please enter a message to send.');
        }
    }
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="section-me">
                        <div>
                            <h1>Contact</h1>
                            <p>Hey there! Reach me at sheethal.p13@gmail.com</p>
                        </div>
                        <div>
                            <h1>Services</h1>
                            <p>Web Development</p>
                            <p>Web Design</p>
                        </div>
                    </div>
                    <div className="section-feedback">
                        <h1>Feedback</h1>
                        <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                        placeholder="Ping me your valuable suggestions or feedback."
                        
                        />
                        <motion.button 
                         whileHover={{scale:1.1}}
                         transition={{type:'spring', stiffness:500}} type="submit"
                         onClick={handleFeedback}
                         >Send</motion.button>
                    </div>
                </div>
                <div className="copyright">
                <p>&copy; <Link to="https://sheethal13.github.io/">Sheethal Sukumar</Link></p>
                </div>
            </div>
        </footer>
    )
}
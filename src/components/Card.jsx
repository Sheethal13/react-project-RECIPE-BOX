import favorite from '../assets/favorite.png'
import comment from '../assets/comment.png'
import view from '../assets/icons8-view-48.png'
import send from '../assets/icons8-send-26.png'
import { Link } from 'react-router-dom'

export default function Card({imgSrc,title,ingredients}){
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
                        <img src={favorite} alt='favorite'/>
                        <img src={comment} alt='comment'/>
                        <img src={send} alt='share' style={{'width':'40px'}}/>
                    </div>
                        <Link><img src={view} alt='view'/></Link>
                </div>
            </div>
        </div>
    );
}
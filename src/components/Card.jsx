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
            </div>
        </div>
    );
}
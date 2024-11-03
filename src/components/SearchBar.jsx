import { useState } from "react"
import search from '../assets/go.png'

export default function SearchBar({dataset}){
    const [searchValue,setSearchValue]=useState('');

    
    function handleSearch(result){
        const filteredResult = result.filter((menu) =>  
            menu.ingredients.some((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
        )
        console.log(result,filteredResult);
    }
    return (
        <>
        <div className="search-div">
        <input type="text" 
        className="search-input"
        placeholder="Search the ingrediants in your hand and find the matching recipe"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}></input>
        <button 
        className="search-button"
        onClick={() => handleSearch(dataset)}>
        <img src={search} alt="go" />
        </button>
        </div>
        </>
    )
}
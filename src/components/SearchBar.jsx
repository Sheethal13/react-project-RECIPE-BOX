import { useContext, useState } from "react"
import search from '../assets/go.png'
import { DataContext } from "../store/DataContext";

export default function SearchBar(){
    const [searchValue,setSearchValue]=useState('');
    const {dataset,filterData}=useContext(DataContext);
    
    function handleSearch(){
        const filteredResult = dataset.filter((menu) =>  
            menu.ingredients.some((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
        )
        filterData(filteredResult);
        console.log(dataset,filteredResult);
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
        onClick={() => handleSearch()}>
        <img src={search} alt="go" />
        </button>
        </div>
        </>
    )
}
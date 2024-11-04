import { createContext, useState , useEffect} from "react";
import {getRecipes} from '../../src/firebase'
export const DataContext = createContext({
    dataset:[],
    filteredDataset:[],
    filterData:() => {}
})
export default function DataContextProvider({children}){
    const [dataset, setDataset] = useState([]);
    const [filteredDataset,setFilteredDataset]=useState(dataset);
    useEffect(() => {
        const fetchRecipes = async () => {
          const response = await getRecipes();
          setDataset(response);
          setFilteredDataset(response);
        }
        fetchRecipes();
    },[]);
    
    function filterData(recipes){
        console.log(recipes);
        setFilteredDataset(recipes);
        console.log(filteredDataset);
    }

    const dataContext={
        dataset,
        filteredDataset,
        filterData
    }

    return (
        <DataContext.Provider value={dataContext}>
            {children}
        </DataContext.Provider>
    )
}
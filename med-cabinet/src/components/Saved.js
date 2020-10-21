import React, {useContext} from 'react';
import NavHeader from './NavHeader'
import { WeedContext } from '../context/WeedContext';
import { ProductContext } from '../context/ProductContext';
const Saved = () => {
    const{savedList}=useContext(WeedContext);
    const {deleteItem} = useContext(ProductContext);
    let i = 1;
    return (
        <>
        <NavHeader />
        <div>
        <h3 className="ml-auto text-align-center">savedList</h3>
        {savedList.map((weed)  => (
           <div key={i+= 1}>
           <h2>{weed.Strain}</h2>
           <p>{weed.Description}</p>
           <button onClick = {() => (deleteItem(weed))}>Delete</button>
       </div> 
        ))}
        </div>
        </>
    )
}

export default Saved;
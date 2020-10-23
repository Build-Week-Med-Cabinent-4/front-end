import React, {useState, useContext} from 'react';
import NavHeader from './NavHeader'
import { WeedContext } from '../context/WeedContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from "react-router-dom";
const Saved = () => {
    const{savedList, setDummy}=useContext(WeedContext);
    const {deleteItem} = useContext(ProductContext);
    const [form,setForm] = useState({
        strain:""
    })
    const handleClick = (item) => {
        setDummy(item);
        console.log(item)
    }
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
        <NavHeader />
        <div>
        <h3 className="ml-auto text-align-center">savedList</h3>
        {savedList.map((weed)  => (
           <div key={weed.strain_id}>
           <h2>{weed.strain}</h2>
           <Link key = {weed.strain_id} to = {`/update-list/${weed.strain_id}`} >
            <button onClick = {() => (handleClick(weed))}>Update Strain Name</button>
            </Link>
           <p>{weed.description}</p>
           <button onClick = {() => (deleteItem(weed))}>Delete</button>
       </div> 
        ))}
        </div>
        </>
    )
}

export default Saved;
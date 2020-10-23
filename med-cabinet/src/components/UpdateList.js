import React, {useState,useEffect,useContext} from "react";
import { useHistory,useParams } from "react-router";
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { WeedContext } from '../context/WeedContext';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom"

import {Container, 
    Collapse,
    Navbar,
   NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

const UpdateList = (item) => {
    //useHistory hook & params
    const history = useHistory();
    const {userId}=useContext(UserContext);
    const {deleteItem, updateItem} = useContext(ProductContext);
    const {dummy} = useContext(WeedContext);
    //setting up empty state for axios put request to edit movie
    const [form,setForm] = useState({
        id:0,
        strain:""
    });
    const emptyState = {
        id:Date.now(),
        strain:""
    }
    
    //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

    const handleChanges = e => {
        const newFormData = {
            ...form, [e.target.name] : e.target.value
        }
        setForm(newFormData);
    }
    const handleSubmit = e => {
        e.preventDefault();
        updateItem(dummy,form)
        history.push('/nav-saved')
    }
    return(
        <div>
            <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand href="/">Med-Cabinet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/nav">Home</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/nav-saved">saved</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/nav-suggestions">suggestions</Link>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Container>
        <h2>Update Strain!</h2>
        <p>
            {dummy.strain}
        </p>
        <p>
            {dummy.description}
        </p>
        <form onSubmit = {handleSubmit}>
            <label htmlFor = "strain">
                Strain Name:
            <input
            type = "text" 
            name = "strain"
            placeholder = {dummy.strain}
            value = {form.strain}
            onChange = {handleChanges}
             />
            </label>
            <button>Update</button>
        </form>
        </div>
    )
}

export default UpdateList;
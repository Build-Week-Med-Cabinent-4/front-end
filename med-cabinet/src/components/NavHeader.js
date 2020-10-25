import React, { useEffect,useState, useContext } from 'react';
import { WeedContext } from '../context/WeedContext';
import { UserContext } from '../context/UserContext';
import { Link } from "react-router-dom"
import axios from 'axios';
//reactstrap styles
import {Container, 
    Collapse,
    Navbar,
   NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

  
const NavHeader = (props) => {
  const {setSavedList}=useContext(WeedContext);
  const {userId}=useContext(UserContext);
  const renderForMe = () => {
    axios
    .get(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`)
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
  })
  .catch(err => {
      console.log(err.message)
  })
  }
      //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    return(
        <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand>Med-Cabinet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/nav">Home</Link>
            </NavItem>
            <NavItem>
            <Link onClick = { () => (renderForMe())}className = "nav-link font-weight-bolder" to = "/nav-saved">saved</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/nav-suggestions">suggestions</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/logged-out" onClick = {() => (window.localStorage.clear())}>Log Out</Link>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Container>
    )
}

export default NavHeader;
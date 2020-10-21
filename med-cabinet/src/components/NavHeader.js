import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom"

//reactstrap styles
import {Container, 
    Collapse,
    Navbar,
   NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

const NavHeader = () => {
      //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    return(
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
    )
}

export default NavHeader;
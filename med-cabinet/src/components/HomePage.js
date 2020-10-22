import React, { useState } from 'react';
import { Link } from "react-router-dom"

//reactstrap styles
import {Container,
    Col,
    Row, 
    Collapse,
    Navbar,
   NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

const HomePage = () => {
          //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand href="/">Med-Cabinet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/login">Login</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/signup">Sign-up</Link>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Container>
            <div className = "justify-content-center d-flex flex-column align-items-center">
                <h3>Welcome To The App That Will Match You To The Perfect Cannabis!</h3>
                <h4>Click Sign-up If You've Never Been With Us Before</h4>
                <h4>Or Just Login!</h4>
            </div> 
        </div>
    )
}

export default HomePage;
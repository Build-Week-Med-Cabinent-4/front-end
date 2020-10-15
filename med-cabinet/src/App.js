import React, { useEffect, useState } from 'react';
import './App.css';

//component imports

//reactstrap styles
import {Container, 
  Collapse,
  Navbar,
 NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

function App() {

  //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);


  return (
  <>
    <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand href="/">Med-Cabinet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <NavLink className = "font-weight-bolder" to = "/">Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink className = "font-weight-bolder" to = "/saved">saved</NavLink>
            </NavItem>
            <NavItem>
            <NavLink className = "font-weight-bolder" to = "/suggestions">suggestions</NavLink>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
  </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import HomePage from "./components/HomePage"
import Saved from "./components/Saved"
import Suggestions from "./components/Suggestions"

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
  <Router>
    <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand href="/">Med-Cabinet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/">Home</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/saved">saved</Link>
            </NavItem>
            <NavItem>
            <Link className = "nav-link font-weight-bolder" to = "/suggestions">suggestions</Link>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path= "/">
            <HomePage />
          </Route>

          <Route exact path= "/saved">
            <Saved />
          </Route>

          <Route exact path= "/suggestions">
            <Suggestions />
          </Route>

        </Switch>
      </Container>
      </Router>
  </>
  );
}

export default App;

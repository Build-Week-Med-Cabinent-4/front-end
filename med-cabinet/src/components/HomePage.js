import React, { useState,useContext } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logIn } from '../actions/actions'
import NavHeader from './NavHeader'
import Home from './Home'
import { UserContext } from '../context/UserContext';
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

const HomePage = (props) => {
  const {setUserId, userId, setButton, button}=useContext(UserContext);
          //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
          {userId>0 ? 
          <>
          <Home />
          </>
          : 
          <>
            <Container className = "p-0" fluid={true} >
      <Navbar className = "border-bottom p-4" color="light" light expand="md">
        <NavbarBrand>Med-Cabinet</NavbarBrand>
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
            </>
            }
        </div>
    )
}
const mapStateToProps = state => {
  return {
      ...state,
      loggingIn: state.loggingIn,
      userInfo:state.userInfo
  }
}

export default connect(mapStateToProps, { logIn })(HomePage)
import React from 'react';
import NavHeader from "./NavHeader"
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

const Home = () => {
    return (
        <div className = "flex-column d-flex justify-content-center align-items-center">
        <NavHeader />
            <div className = "ml-5">
                <h3>The Greatest Source of Cannabis Needs</h3>
                <img 
                src ="https://images.unsplash.com/photo-1503262028195-93c528f03218?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt = "purp" width = "50%"/>
                <p>
                    Checkout Our Suggestions Link to find the Strain that's perfect for your needs!<br/>
                    Whether you're sick of being sick or aggitated , we have something for you!<br/>
                    Also , feel free to save strains that peak your interest to look at them later !
                </p>
                <h2>Wanna Leave the app and go back to our Landing page?</h2>
                <h3>Click here!</h3>
                <a href = "https://medcabinent.netlify.app/">Landing Page</a>
            </div> 
        </div>
    )
}

export default Home;
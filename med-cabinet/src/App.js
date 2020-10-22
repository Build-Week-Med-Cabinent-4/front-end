import React, { useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import "./styles.css";
//import axiosWithAuth from './utils/axiosWithAuth';
import axios from 'axios';

//component imports
import HomePage from "./components/HomePage"
import Saved from "./components/Saved"
import Suggestions from "./components/Suggestions"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Strains from './components/Strains'
import { WeedContext } from './context/WeedContext';
import { ProductContext } from './context/ProductContext';
import Home from './components/Home';
//reactstrap styles
import {Container, 
  Collapse,
  Navbar,
 NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

function App() {
  //saved list
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = weed => {
    setSavedList([...savedList, weed]);
  };
  const deleteItem = (item) => {
    console.log(item)
    console.log(item.Strain)
    setSavedList(savedList.filter(weed => weed.Strain !== item.Strain));
    console.log(savedList)
	}
  //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

  return (
  <>
  <Router>
  <ProductContext.Provider value={{addToSavedList,deleteItem}}>
		<WeedContext.Provider value={{savedList}}>
    <Container className = "p-0" fluid={true} >
        <Switch>
        <Route exact path= "/">
            <HomePage />
          </Route>
          <Route exact path= "/nav">
            <Home />
          </Route>

          <Route exact path= "/nav-saved">
            <Saved />
          </Route>

          <Route exact path= "/nav-suggestions">
            <Suggestions addToSavedList = {addToSavedList} />
          </Route>

          <Route exact path= "/login">
            <Login />
          </Route>

          <Route exact path= "/signup">
            <Signup />
          </Route>
          <Route exact path= "/strains:id">
            <Strains addToSavedList = {addToSavedList} />
          </Route>

        </Switch>
      </Container>
      </WeedContext.Provider>
		  </ProductContext.Provider>
      </Router>
  </>
  );
}

export default App;

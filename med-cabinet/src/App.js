import React, { useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import { useHistory,useParams,useLocation } from "react-router";
import "./styles.css";
//import axiosWithAuth from './utils/axiosWithAuth';
import {axiosWithAuth} from './utils/axiosWithAuth';
import axios from 'axios'
import { connect } from 'react-redux'
//component imports
import HomePage from "./components/HomePage"
import Saved from "./components/Saved"
import Suggestions from "./components/Suggestions"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Strains from './components/Strains'
import { WeedContext } from './context/WeedContext';
import { ProductContext } from './context/ProductContext';
import { UserContext } from './context/UserContext';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';
import { logIn } from './actions/actions'
import UpdateList from './components/UpdateList'
import LogOut from './components/LogOut'
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
  const [userId, setUserId] = useState(null);
  const [button, setButton] = useState(false);
  const [dummy,setDummy] = useState({
    strain:"Citrus-Punch"
  });
  const location = useLocation;
  //attempt to fix reload
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setUserId(window.localStorage.getItem('userInfo'));
        
        axiosWithAuth()
    .get(`/users/${userId}/strains`)
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
  })
  .catch(err => {
      console.log(err.message)
  })
  
    console.log(userId)
      }
    }
  },[window.performance.navigation])

  useEffect(() => {
    console.log(userId)
    setUserId(window.localStorage.getItem('userInfo'));
    console.log(window.localStorage.getItem('userInfo'))
    axiosWithAuth()
    .get(`/users/${userId}/strains`)
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
  })
  .catch(err => {
      console.log(err.message)
  })
  }, [button] );
  const addToSavedList = weed => {

    console.log(userId)
    axiosWithAuth()
    .post(`/users/${userId}/strains`, weed)
    .then(res => {
      console.log(res.data)
      setButton(!button)
      setButton(!button)
  })
  .catch(err => {
      console.log(err.message)
  })
  };
  const deleteItem = (item) => {
    console.log(item)
    console.log(item.Strain)
    axiosWithAuth()
    .delete(`users/${userId}/strains/${item.strain_id}`, item)
    .then(res => {
      console.log(res.data)
      setSavedList(savedList.filter((weed) => ( weed.strain_id !== item.strain_id || weed.id !== item.id
      )))
      setButton(!button)
      setButton(!button)
  
  })
  .catch(err => {
      console.log(err.message)
  })

  }
  
  const updateItem = (item,string) => {
    axiosWithAuth()
    .put(`/users/${userId}/strains/${item.strain_id}`, string)
    .then(res => {
      console.log(res.data)
      axiosWithAuth()
    .get(`/users/${userId}/strains`)
    
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
      setButton(!button)
      setButton(!button)
  })
})
  .catch(err => {
      console.log(err.message)
  })
  }
  //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

  return (
  <>
  <Router>
  <ProductContext.Provider value={{addToSavedList,deleteItem,updateItem}}>
  <UserContext.Provider value = {{userId,setUserId, setButton,button}}>
		<WeedContext.Provider value={{savedList, dummy , setDummy, setSavedList}}>
    <Container className = "p-0" fluid={true} >
        <Switch>
        <Route exact path= "/">
            <HomePage />
          </Route>
          <PrivateRoute exact path= "/nav" component= {Home} />

          <Route exact path= "/nav-saved">
            <Saved />
          </Route>

          <Route exact path= "/nav-suggestions">
            <Suggestions addToSavedList = {addToSavedList} />
          </Route>

          <Route exact path= "/login">
            <Login />
          </Route>

          <Route exact path="/update-list/:id">
            <UpdateList item ={dummy} />
          </Route>

          <Route exact path= "/signup">
            <Signup />
          </Route>
          <Route exact path= "/strains:id">
            <Strains addToSavedList = {addToSavedList} />
          </Route>
          <Route exact path= "/logged-out">
            <LogOut />
          </Route>

        </Switch>
      </Container>
      </WeedContext.Provider>
      </UserContext.Provider>
		  </ProductContext.Provider>
      </Router>
  </>
  );
}

export default App;

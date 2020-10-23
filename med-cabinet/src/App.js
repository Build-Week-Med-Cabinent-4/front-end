import React, { useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import { useHistory,useParams } from "react-router";
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
//reactstrap styles
import {Container, 
  Collapse,
  Navbar,
 NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

function App(props) {
  //saved list
  const [savedList, setSavedList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [button, setButton] = useState(false);
  const [dummy,setDummy] = useState({
    strain:"Citrus-Punch"
  });

  const history = useHistory();

  useEffect(() => {
    console.log(userId)
    axios
    .get(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`)
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
  })
  .catch(err => {
      console.log(err.message)
  })
  }, [props,button] );
  const addToSavedList = weed => {

    console.log(userId)
    axios
    .post(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`, weed)
    .then(res => {
      console.log(res.data)
      setSavedList([...savedList,res.data]);
      axios
      .get(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`)
    .then(res => {
      console.log(res.data)
    console.log(savedList)
  })
  })
  .catch(err => {
      console.log(err.message)
  })
  };
  const deleteItem = (item) => {
    console.log(item)
    console.log(item.Strain)
    axios
    .delete(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains/${item.strain_id}`, item)
    .then(res => {
      console.log(res.data)
      setSavedList(savedList.filter((weed) => ( weed.strain_id !== item.strain_id || weed.id !== item.id
      )))
  
  })
  .catch(err => {
      console.log(err.message)
  })

  }
  
  const updateItem = (item,string) => {
    axios
    .put(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains/${item.strain_id}`, string)
    .then(res => {
      console.log(res.data)

    axios
    .get(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`)
    
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
    <UserContext.Provider value = {{userId,setUserId}}>
		<WeedContext.Provider value={{savedList, dummy , setDummy}}>
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

        </Switch>
      </Container>
      </WeedContext.Provider>
      </UserContext.Provider>
		  </ProductContext.Provider>
      </Router>
  </>
  );
}

const mapStateToProps = state => {
  return {
      ...state,
      loggingIn: state.loggingIn,
      userInfo:state.userInfo,
      username: state.username
  }
}

export default connect(mapStateToProps, { logIn })(App)

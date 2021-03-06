import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import NavHeader from './NavHeader'
import Strains from './Strains'

const Suggestions = ( {addToSavedList} ) => {
     //This is our DATA STATE
  const [strainState, setNewStrain] = useState({
    name: "",
    email: "",
    password: "",
    ailment: "",
    flavors:""
});
//data
const [data,setData] = useState([]);

  //this is our BUTTON STATE
  const [buttonOn, setButtonOn] = useState(true);

  // this is our ERRORS State
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    ailment: "",
    flavors:"",
    effects:""
  });

  //Here is the function to CHANGE STATE(newUser)
  const inputChange = (event) => {
    event.persist();
    //Schema(event);
    setNewStrain({
      ...strainState,
      [event.target.name]: event.target.value
    });
    console.log(strainState);
  };


  const [post, setPost] = useState();

  //Here is the function for onSubmit
  const onSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("https://strains-cannabis.herokuapp.com/predict ", strainState)
      .then((response) => {
        console.log("succesful", response.data);
        setPost(response.data); 
        setData(response.data);
        setNewStrain ({
          name: "",
          email: "",
          password: "",
          ailment:"",
          flavors:"",
          effects:""
        }
      )})

      .catch((error) => {
        console.log("this is an error", error);
        setErrors(error.data);
      });
  };
  
//   All validation coding below:
  const formSchema = yup.object().shape({
    ailment: yup
      .string()
      .oneOf(["headaches", "stress", "insomnia", "NaN"]),
    flavors: yup
      .string()
      .oneOf(["Earthy", "Sweet", "Citrus", "Diesal"]),
    effects: yup
      .string()
      .oneOf(["Energetic", "Tingly", "Euphoric", "Relaxed"]),
   });

  const Schema = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .then((response) => {
        console.log("succesful", response);
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((response) => {
        console.log("error", response);
        setErrors({ ...errors, [e.target.name]: response.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(strainState).then((succesful) => {
      console.log("working", succesful);
      setButtonOn(!succesful);
    });
  }, [strainState]);

  return (
    <div>
    <NavHeader/>
    <div className = "p-5">
    <form onSubmit={onSubmitForm}>
      <h1>Strain Form</h1>

    <label htmlFor="ailment">
    Ailment
        <select
                type="text"
                name="ailment"
                value={strainState.ailment}
                onChange={inputChange}
                data-cy="ailment">

          <option value="">--Choose One--</option>
          <option value='headaches' data-cy="headaches" >headaches</option>
          <option value='stress' data-cy="stress">stress</option>
          <option value='insomnia' data-cy="insomnia">insomnia</option>
          <option value='NaN' data-cy="NaN">NaN</option>

        </select>
      </label>          
      <label htmlFor="flavors">
          Flavor
          <select
                  type="text"
                  name="flavors"
                  value={strainState.flavors}
                  onChange={inputChange}
                  data-cy="flavors">  

            <option value="">--Choose One--</option>
            <option value='Earthy' data-cy="Earthy" >Earthy</option>
            <option value='Sweet' data-cy="Sweet">Sweet</option>
            <option value='Citrus' data-cy="Citrus">Citrus</option>
            <option value='Diesal' data-cy="Diesal">Diesal</option>

          </select>
      </label>
      <label htmlFor="effects">
          Effects
          <select
                  type="text"
                  name="effects"
                  value={strainState.effects}
                  onChange={inputChange}
                  data-cy="flavors">  

            <option value="">--Choose One--</option>
            <option value='Energetic' data-cy="Energetic" >Energetic</option>
            <option value='Tingly' data-cy="Tingly">Tingly</option>
            <option value='Euphoric' data-cy="Euphoric">Euphoric</option>
            <option value='Relaxed' data-cy="Relaxed">Relaxed</option>

          </select>
      </label>

      <button type="submit"  data-cy="submit" disabled={buttonOn}>
        Submit
      </button>
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
    
    <Strains weed = {data} />
    </div>
    </div>
  );
};


export default Suggestions;
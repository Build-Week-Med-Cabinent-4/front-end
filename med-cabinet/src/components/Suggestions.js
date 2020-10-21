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
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
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
  
  //All validation coding below:
  // const formSchema = yup.object().shape({
  //   // name: yup
  //   //   .string("Please enter name.")
  //   //   .required("A valid name is required."),
  //   // email: yup
  //   //   .string()
  //   //   .email("Please enter e-mail")
  //   //   .required("Valid e-mail address required."),
  //   // password: yup
  //   //   .string("Please enter a password")
  //   //   .required("Must enter a password"),
  //   ailment: yup
  //     .string()
  //     .oneOf(["headaches", "symptom2", "symptom3", "symptom4"]),
  //   flavors: yup
  //     .string()
  //     .oneOf(["flavor1", "flavor2", "flavor3", "flavor4"]),
      
   // });

  // const Schema = (e) => {
  //   yup
  //     .reach(formSchema, e.target.name)
  //     .validate(
  //       e.target.type === "checkbox" ? e.target.checked : e.target.value
  //     )
  //     .then((response) => {
  //       console.log("succesful", response);
  //       setErrors({ ...errors, [e.target.name]: "" });
  //     })
  //     .catch((response) => {
  //       console.log("error", response);
  //       setErrors({ ...errors, [e.target.name]: response.errors[0] });
  //     });
  // };

  // useEffect(() => {
  //   formSchema.isValid(strainState).then((succesful) => {
  //     console.log("working", succesful);
  //     setButtonOn(!succesful);
  //   });
  // }, [strainState]);

  return (
    <div>
    <NavHeader/>
    <div className = "p-5">
    <form onSubmit={onSubmitForm}>
      <h1>Strain Form</h1>
      {/* <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          placeholder="Enter Name Here"
          type="text"
          value={strainState.name}
          onChange={inputChange}
          data-cy="name"
        />
      </label>
      <label htmlFor="email">
        E-mail
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        <input
          id="email"
          name="email"
          placeholder="Enter your e-mail here"
          type="email"
          value={strainState.email}
          onChange={inputChange}
          data-cy="email"

        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          placeholder="Enter your password here."
          type="password"
          value={strainState.password}
          onChange={inputChange}
          data-cy="password"
        />
      </label> */}

    <label htmlFor="ailment">
    ailment
        <select
                type="text"
                name="ailment"
                value={strainState.ailment}
                onChange={inputChange}
                data-cy="symptoms">

          <option value="">--Choose One--</option>
          <option value='headaches' data-cy="symptom1" >headaches</option>
          <option value='nausia' data-cy="symptom2">nausia</option>
          <option value='restlessness' data-cy="symptom3">restlessness</option>
          <option value='paranoia' data-cy="symptom4">paranoia</option>

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
            <option value='Earthy' data-cy="flavor1" >Earthy</option>
            <option value='Sweet' data-cy="flavor2">Sweet</option>
            <option value='Citrus' data-cy="flavor3">Citrus</option>
            <option value='Diesal' data-cy="flavor4">Diesal</option>

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
            <option value='Energetic' data-cy="flavor1" >Energetic</option>
            <option value='Tingly' data-cy="flavor2">Tingly</option>
            <option value='Euphoric' data-cy="flavor3">Euphoric</option>
            <option value='Relaxed' data-cy="flavor4">Relaxed</option>

          </select>
      </label>

      <button type="submit"  data-cy="submit">
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
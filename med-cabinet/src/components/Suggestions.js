import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

const Suggestions = () => {
     //This is our DATA STATE
  const [strainState, setNewStrain] = useState({
    name: "",
    email: "",
    password: "",
    symptoms: "",
    flavors:""
});

  //this is our BUTTON STATE
  const [buttonOn, setButtonOn] = useState(true);

  // this is our ERRORS State
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    symptoms: "",
    flavors:""
  });

  //Here is the function to CHANGE STATE(newUser)
  const inputChange = (event) => {
    event.persist();
    Schema(event);
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
      .post("https://reqres.in/api/users", strainState)
      .then((response) => {
        console.log("succesful", response);
        setPost(response.data); 
        
        setNewStrain ({
          name: "",
          email: "",
          password: "",
          symptoms:"",
          flavors:""
        }
      )})

      .catch((error) => {
        console.log("this is an error", error);
        setErrors(error.data);
      });
  };
  
  //All validation coding below:
  const formSchema = yup.object().shape({
    // name: yup
    //   .string("Please enter name.")
    //   .required("A valid name is required."),
    // email: yup
    //   .string()
    //   .email("Please enter e-mail")
    //   .required("Valid e-mail address required."),
    // password: yup
    //   .string("Please enter a password")
    //   .required("Must enter a password"),
    symptoms: yup
      .string()
      .oneOf(["symptom1", "symptom2", "symptom3", "symptom4"]),
    flavors: yup
      .string()
      .oneOf(["flavor1", "flavor2", "flavor3", "flavor4"]),
      
    });

  const Schema = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
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

    <label htmlFor="symptoms">
        Symptoms
        <select
                type="text"
                name="symptoms"
                value={strainState.symptoms}
                onChange={inputChange}
                data-cy="symptoms">

          <option value="">--Choose One--</option>
          <option value='symptom1' data-cy="symptom1" >symptom1</option>
          <option value='symptom2' data-cy="symptom2">symptom2</option>
          <option value='symptom3' data-cy="symptom3">symptom3</option>
          <option value='symptom4' data-cy="symptom4">symptom4</option>

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
          <option value='flavor1' data-cy="flavor1" >flavor1</option>
          <option value='flavor2' data-cy="flavor2">flavor2</option>
          <option value='flavor3' data-cy="flavor3">flavor3</option>
          <option value='flavor4' data-cy="flavor4">flavor4</option>

        </select>
    </label>

      <button type="submit" disabled={buttonOn} data-cy="submit">
        Submit
      </button>
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
};
    

export default Suggestions;
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser } from '../actions/actions'

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
  
const Signup = (props) => {
    const history = useHistory();

    const [formState, setFormState] = useState({
        username:"",
        password:""
    })

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(formState.username && formState.password){            
            props.createUser(formState)
            return history.push('/')
        }

        return setFormState({
            username: "",
            password: ""
        })
    }

    return (
        <Container className="App">
          <h2>Sign Up</h2>
          <Form className="form" onSubmit={handleSubmit} >
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  placeholder="username"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
      );
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, { createUser })(Signup)
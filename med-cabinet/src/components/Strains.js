import React, { useState, useContext } from "react";
import { Container, Row, Col } from 'reactstrap';
import { saveRecommend } from '../actions/actions';
import { connect } from 'react-redux'
import {ProductContext} from '../context/ProductContext'
import {UserContext} from '../context/UserContext'

const Strains = (props) => {
    const {addToSavedList}=useContext(ProductContext);
    const {userId}=useContext(UserContext);

    const handleSubmit = (weed) => {
        //props.saveRecommend(weed,userId)
        addToSavedList(weed)
        console.log("working")
    }
    return (
      <>
        <Container>
          <Row>
          <div>
              {props.weed.map(weed => (
              <Col>
                  <div key={Date.now()+weed.length}>
                      <h2>{weed.Strain}</h2>
                      <p>{weed.Description}</p>
                      <button onClick = {() => handleSubmit(weed)}>Save Strain</button>
                  </div>
              </Col>
              ))}
          </div>
          </Row>
        </Container>
      </>
    );
};
const mapStateToProps = state => {
    return {
        ...state,
        saved: state.saved
    }
}
export default connect(mapStateToProps, { saveRecommend })(Strains)
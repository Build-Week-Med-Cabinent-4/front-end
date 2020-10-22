import React, { useState, useContext } from "react";
import { Container, Row, Col } from 'reactstrap';
import { saveRecommend } from '../actions/actions';
import { connect } from 'react-redux'
import {ProductContext} from '../context/ProductContext'

const Strains = (props) => {
    const {addToSavedList}=useContext(ProductContext);
    const saveStrain = (weed) => {
        addToSavedList(weed)
    }
    const handleSubmit = (weed) => {
        addToSavedList(weed);
        console.log("working")
        console.log(weed)
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
import React, { useState, useContext } from "react";
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import {UserContext} from '../context/UserContext'
//sign up

export const POST_USER = "POST_USER"
export const USER_SUCCESS = "USER_SUCCESS"
export const USER_ERROR = "USER_ERROR"

//login

export const LOGGING_IN = "LOGGING_IN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

//logout

export const LOGOUT = "LOGOUT"

//saving reccomendations

export const SAVE_INITIALIZE = 'SAVE_INITIALIZE'
export const SAVE_RECOMMEND_SUCCESS = 'SAVE_RECOMMEND_SUCCESS'
export const SAVE_RECOMMEND_FAILURE = 'SAVE_RECOMMEND_FAILURE' 


//function to create user

export const createUser = (creds) => dispatch => {

    dispatch({ type: POST_USER });

    axiosWithAuth()
    .post('/register', creds)
    .then(res => {
        console.log(res.data)
        window.localStorage.setItem('token', res.data.token)
        dispatch({ type: USER_SUCCESS, payload: res.data })
    })
    .catch(err => {
        console.log('Error', err.message)
        dispatch({ type: USER_ERROR, payload: err.message })
    })
}

//function to login 

export const logIn = (creds,cb) => dispatch => {
    dispatch({ type: LOGGING_IN })
    
    axiosWithAuth()
    .post("/login", creds)
    .then(res => {
        console.log("success")
        console.log(res)
        window.localStorage.setItem('token', res.data.token)
        cb(res.data.userInfo)
        cb(res.data.userInfo)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        
    })
    .catch(err => {
        console.log(err.message)
        dispatch({ type: LOGIN_ERROR, payload: err.message })
    })
}

//logout function

export const logOut = () => {
    window.localStorage.clear();
    return {
        type: LOGOUT
    }
}

//function to save reccomendations

export const saveRecommend = (weed,userId) => dispatch => {
    dispatch ({ type: SAVE_INITIALIZE })

    axios
    .post(`https://med-cabinet-6.herokuapp.com/api/users/${userId}/strains`, weed)
    .then(res => {
        console.log(res.data)
        dispatch({ type: SAVE_RECOMMEND_SUCCESS, payload: res.data.message })
    })
    .catch(err => {
        console.log(err.message)
        dispatch({ type: SAVE_RECOMMEND_FAILURE, payload: err.message })
    })
}
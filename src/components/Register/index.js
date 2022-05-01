import './style.css'
import { createUser } from '../../actions/user_actions'
import { useDispatch } from 'react-redux'
import NavigationBar from '../NavigationBar'
import { useEffect } from 'react'
import { getLoggedInUserDetails } from '../../service/user_service'
import { useNavigate } from 'react-router-dom'
import React from "react";



const Register = () => {
    let user = {}
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const details = getLoggedInUserDetails();
      console.log(details);
      if (details !== null && details !== undefined) {
        navigate("/");
      }
    }, []);

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      
  
    
    const registerUser = () => {


        if (user.name === undefined || user.password === undefined) {
            alert("Invalid Username/Password!");
        }

        if (user.email === undefined || !validateEmail(user.email)) {
            alert("Invalid Email!");

        }

        
        if(user.userType===undefined || user.userType===null) {
            user.userType = "user";
        }
        
        createUser(dispatch,user);
    }

    const onValueChange = (event) => {
        user.userType = event.target.value;
    }

    const nameOnChangeHandler = (name) => {
        user.name = name;
    }

    const emailOnChangeHandler = (email) => {
        user.email = email;
    }

    const passwordOnChangeHandler = (password) => {
        user.password = password;
    }


    return(
        <>
        <NavigationBar/>

        <div className="jumbotron jumbotron-fluid jumbo-image-login">
                <div className="container">
                    <h1 className="display-4 ht-centered-login">Register</h1>
                </div>
            </div>

        <div className="form border rounded">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">Name </label>
                    <input className="form__input form-control" type="text" id="firstName" placeholder="Full Name" onChange={(event) => {
                    nameOnChangeHandler(event.target.value);
                }} required/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input form-control" placeholder="Email" onChange={(event) => {
                    emailOnChangeHandler(event.target.value);
                }} required/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input form-control" type="password"  id="password" placeholder="Password" onChange={(event) => {
                    passwordOnChangeHandler(event.target.value);
                }} required/>
                </div>
                <div className="userType">
                    <span>How do you want to sign up: </span>
                    <label className="wd-radio" for="userType">
                    <input type="radio" className="wd-inputRadio" id="userType" name="userType" value="user" checked
              onChange={(event) => onValueChange(event)}></input>
                    User </label>
                    <label className="wd-radio" for="nutriType">
                    <input type="radio" className="wd-inputRadio" id="nutriType" name="userType" value="nutritionist"
              onChange={(event) => onValueChange(event)}></input>
                    Nutritionist  </label>
                    
                </div>
            </div>

            <div className="footer">
                <button onClick={() => registerUser()} type="button" class="btn btn-primary form-control">Register</button>
            </div>
        </div>      
        </>
      )
}
export default Register;
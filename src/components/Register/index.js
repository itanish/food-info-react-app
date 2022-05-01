import './style.css'
import { createUser } from '../../actions/user_actions'
import { useDispatch } from 'react-redux'
import NavigationBar from '../NavigationBar'
import { useEffect } from 'react'
import { getLoggedInUserDetails } from '../../service/user_service'
import { useNavigate } from 'react-router-dom'


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
  
    
    const registerUser = () => {
        
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
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="Full Name" onChange={(event) => {
                    nameOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" placeholder="Email" onChange={(event) => {
                    emailOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password" onChange={(event) => {
                    passwordOnChangeHandler(event.target.value);
                }}/>
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
                <button onClick={() => registerUser()} type="button" class="btn btn-primary">Register</button>
            </div>
        </div>      
        </>
      )
}
export default Register;
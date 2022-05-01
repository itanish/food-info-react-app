import { loginUser,logoutUser } from "../../actions/user_actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { getLoggedInUserDetails } from "../../service/user_service";
import { useEffect } from "react";


const Login = () => {
    let loginDetails  = {}
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailOnChangeHandler =(email) => {
        loginDetails.email = email;
    }

    const passwordChangeHandler = (password) => {
        loginDetails.password = password
    }
    const onValueChange = (event) => {
        loginDetails.userType = event.target.value;
    }


    const login = () => {
        loginUser(dispatch, loginDetails).then(() => {
            
            if(localStorage.getItem("user")===null) {
                alert("Invalid Credentials")
            }
            else {
                const u = getLoggedInUserDetails();
                if(u.access===false) {
                    alert("Nutritionist not authorised by admin.")
                    logoutUser(dispatch);
                }
                else {
                navigate("/");
                }
            }
        });
    }

    useEffect(() => {
        const details = getLoggedInUserDetails();
        console.log(details);
        if (details !== null && details !== undefined) {
            navigate("/");
        }
    }, []);
    
    return(
        <>
        <NavigationBar />
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" placeholder="Email" onChange={(event) => {emailOnChangeHandler(event.target.value)}}/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password" onChange={(event) => {passwordChangeHandler(event.target.value)}}/>
                </div>
            </div>
            <div className="userType">
                    <span>How do you want to log in: </span>
                    <input type="radio" className="wd-inputRadio" name="userType" value="user" 
                onChange={(event) => onValueChange(event)}></input>
                    <label className="wd-radio" for="userType">User </label>
                    <input type="radio" className="wd-inputRadio" name="userType" value="nutritionist"
                onChange={(event) => onValueChange(event)}></input>
                    <label className="wd-radio" for="userType">Nutritionist  </label>
                    
            </div>
            <div className="footer">
                <button type="button" class="btn btn-primary" onClick={login}>Login</button>
            </div>
            <div >
                <span>New User? Register here</span>
                <button type="button" class="btn btn-primary" onClick={() => navigate("/register")}>Register</button>
            </div>
        </div> 
        </>     
      )
}
export default Login;
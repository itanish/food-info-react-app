import { loginUser,logoutUser } from "../../actions/user_actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { getLoggedInUserDetails } from "../../service/user_service";
import './style.css';
import { useEffect } from "react";


const Login = () => {
    let loginDetails  = {}
    loginDetails.userType = "user";
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
        <div className="row">
            <div className="col">
                <div className="center">
                    <div className="card">
                        
                            {/* <label className="form-item" for="email">Email </label> */}
                            <input  type="email" id="email" className="form-control form-item" placeholder="Email" onChange={(event) => {emailOnChangeHandler(event.target.value)}}/>
                        
                        
                            {/* <label className="form-item" for="password">Password </label> */}
                            <input className=" form-control form-item" type="password"  id="password" placeholder="Password" onChange={(event) => {passwordChangeHandler(event.target.value)}}/>
                        
                        <div className="userType">
                            <span> Log in as? </span>
                            <input type="radio" className="wd-inputRadio form-check-input" name="userType" value="user" checked id="userRadio"
                        onChange={(event) => onValueChange(event)}></input>
                            <label className="wd-radio form-check-label" for="userRadio">User </label>
                            <input type="radio" className=" wd-inputRadio form-check-input" name="userType" value="nutritionist" id="nutriRadio"
                        onChange={(event) => onValueChange(event)}></input>
                            <label className="wd-radio form-check-label" for="nutriRadio">Nutritionist  </label>
                        </div>
                        <button type="button" className="form-control  btn btn-primary form-submit mb-2" onClick={login}>Login</button>
                        <span className="wd-margin">New User? Register here</span>
                        <button type="button" className="form-control btn btn-primary form-submit" onClick={() => navigate("/register")}>Register</button>
                    </div>
                    
                </div> 
            </div>
            <div className="col wd-margin">
                <img src="https://source.unsplash.com/1Shk_PkNkNw/600x600" alt=""/>
            </div>
        </div>
        </>     
      )
}
export default Login;
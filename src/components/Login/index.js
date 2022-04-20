import { loginUser } from "../../actions/user_actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
    let loginDetails  = {}
    const dispatch = useDispatch();
    const emailOnChangeHandler =(email) => {
        loginDetails.email = email;
    }

    const passwordChangeHandler = (password) => {
        loginDetails.password = password
    }

    const login = () => {
        console.log("Login BUtton click", loginDetails)
        loginUser(dispatch, loginDetails);
    }

    return(
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
            <div className="footer">
                <Link to="/profile"><button type="button" class="btn btn-primary" onClick={login}>Login</button></Link>
            </div>
        </div>      
      )
}
export default Login;
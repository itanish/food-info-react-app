import { loginForAdmin } from "../../../actions/user_actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
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

        loginForAdmin(dispatch, loginDetails);
        navigate("/admin");
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
                <button type="button" class="btn btn-primary" onClick={login}>Login</button>
            </div>
        </div>      
      )
}
export default AdminLogin;
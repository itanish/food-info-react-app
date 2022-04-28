import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { logoutUser } from "../../actions/user_actions";
import './bar.css';

const renderLoggedInUserDetails = (userDetails, dispatch) => {
    console.log("nav bar", userDetails);
    if (userDetails && Object.keys(userDetails).length > 0) {
      return (
        <>
          <div>
            <Link to="/profile">
              <span className="text-white">Hi {userDetails.name}</span>
            </Link>
          </div>
          <div className="wd-space-between-things">
            <Link to="/">
              <span className="text-white" onClick={() => logoutUser(dispatch)}>Logout</span>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link className="nav-link" to="/login">
            <span className="text-white">Login </span>
          </Link>
          <Link className="nav-link" to="/register">
            <span className="text-white">Register</span>
          </Link>
        </>
      );
    }
}

const NavigationBar = () => {
    const userDetails = useSelector((state) => state.users);
    const dispatch = useDispatch();
    return (
      <div>
        <nav class="navbar navbar-light wd-bg_color">
          <Link className="navbar-brand" to="/">
            <span className="text-white">Food Recommender</span>
          </Link>
          <div className="float-right d-inline-flex">
            {renderLoggedInUserDetails(userDetails, dispatch)}
          </div>
        </nav>
      </div>
    );
}

export default NavigationBar;
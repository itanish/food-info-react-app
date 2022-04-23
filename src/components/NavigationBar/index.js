import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { logoutUser } from "../../actions/user_actions";

const renderLoggedInUserDetails = (userDetails, dispatch) => {
    console.log("nav bar", userDetails);
    if (userDetails && Object.keys(userDetails).length > 0) {
      return (
        <>
          <div>
            <Link to="/profile">
              <span>Hi {userDetails.name}</span>
            </Link>
          </div>
          <div className="wd-space-between-things">
            <Link to="/">
              <span onClick={() => logoutUser(dispatch)}>Logout</span>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
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
            Food Recommender
          </Link>
          <div className="float-right d-inline-flex">
            {renderLoggedInUserDetails(userDetails, dispatch)}
          </div>
        </nav>
      </div>
    );
}

export default NavigationBar;
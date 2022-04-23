import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const renderLoggedInUserDetails = (userDetails) => {
    console.log("nav bar", userDetails);
    if (userDetails && Object.keys(userDetails).length > 0) {
      return (
        <>
          <Link to="/profile">
            <span>Hi {userDetails.name}</span>
          </Link>
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
    return (
      <div>
        <nav class="navbar navbar-light wd-bg_color">
          <Link className="navbar-brand" to="/">
            Food Recommender
          </Link>
          <div className="float-right d-inline-flex">
            {renderLoggedInUserDetails(userDetails)}
          </div>
        </nav>
      </div>
    );
}

export default NavigationBar;
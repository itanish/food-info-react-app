import {Link} from "react-router-dom";

const renderLoggedInUserDetails = () => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(userDetails);
    if (userDetails) {
        return(
            <>
                <span>Hi {userDetails.name}</span>
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
    return (
        <div>
        <nav class="navbar navbar-light wd-bg_color">
            <Link className="navbar-brand" to="/">Food Recommender</Link>
            <div className="float-right d-inline-flex">
                {renderLoggedInUserDetails()}
            </div>
        </nav>
        </div>
    );
}

export default NavigationBar;
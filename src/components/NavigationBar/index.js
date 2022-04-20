import {Link} from "react-router-dom";

const NavigationBar = () => {
    return (

        <div>
        <nav class="navbar navbar-light wd-bg_color">
            <Link className="navbar-brand" to="/">Food Recommender</Link>
            <div className="float-right d-inline-flex">
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
            </div>
        </nav>
        </div>
    );
}

export default NavigationBar;
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { logoutUser } from "../../actions/user_actions";
import './bar.css';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const routeChange = (naviagte, route) => {
	naviagte(route);
}

const renderLoggedInUserDetails = (userDetails, dispatch, navigate) => {
    if (userDetails && Object.keys(userDetails).length > 0) {
      return (
        <>
          {/* <div>
            <Link to="/profile">
              <strong>
                <span>Hi {userDetails.name}</span>
              </strong>
            </Link>
          </div>
          <div className="wd-space-between-things">
            <strong>
              <Link to="/">
                <span onClick={() => logoutUser(dispatch)}>Logout</span>
              </Link>
            </strong>
          </div> */}

          <div>
            <NavDropdown
              title={`Hi ${userDetails.name}`}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => routeChange(navigate, "/profile")}>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logoutUser(dispatch)}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link className="nav-link" to="/login">
            <strong>
              <span>Login </span>
            </strong>
          </Link>
          <Link className="nav-link" to="/register">
            <strong>
              <span>Register</span>
            </strong>
          </Link>
        </>
      );
    }
}

const NavigationBar = () => {
    const userDetails = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
      // <div>
      //   <nav>
      //     <Link className="navbar-brand" to="/">
      //       <span>Food Recommender</span>
      //     </Link>
      //     <div className="float-end d-inline-flex">
      //       {renderLoggedInUserDetails(userDetails, dispatch)}
      //     </div>
      //   </nav>
      // </div>

      <>
        <Container>
          <Navbar>
            <Nav className="ms-auto d-inline-flex">
              {renderLoggedInUserDetails(userDetails, dispatch, navigate)}
            </Nav>
          </Navbar>
        </Container>
      </>
    );
}

export default NavigationBar;
import {useSelector} from "react-redux";
import {getUserByEmail} from "../../actions/user_actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { loadState } from "../../service/user_service";

const UserProfile = () => {
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    
    useEffect(() => {
      const userDetails = loadState();
      // console.log(userDetails);
      if (userDetails !== undefined && userDetails !== null) {
        dispatch({
          type: "LOGIN_USER",
          user: userDetails,
        });
      }
    }, []);

    console.log("User Profile:",users);

    return (
        <>
            <NavigationBar/>
            <p>{users.name}</p>
            <p>{users.email}</p>
            <Link to="/editProfile"><button type="button">Edit Profile</button></Link>
            <Link to="/"><button type="button">Home</button></Link>
            <Link to="/addmeal"><button type="button">Add Meal</button></Link>

        </>
    );
}

export default UserProfile;
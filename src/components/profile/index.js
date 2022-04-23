import {useSelector} from "react-redux";
import {getUserByEmail} from "../../actions/user_actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const UserProfile = () => {
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    useEffect(() => {
        getUserByEmail(dispatch, users._id);
    }, []);
    console.log("User Profile:",users);

    return (
        <>
            <NavigationBar/>
            <p>{users.name}</p>
            <p>{users.email}</p>
            <Link to="/editProfile"><button type="button">Edit Profile</button></Link>
        </>
    );
}

export default UserProfile;
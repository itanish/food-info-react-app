import {useSelector} from "react-redux";
import {getUserByEmail} from "../actions/user_actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const UserProfile = () => {
    
    const dispatch = useDispatch();
    let users = useSelector(state => state.users)
    useEffect(() => {
        users =  getUserByEmail(dispatch, "rajat@mail.com");
    }, []);

    // const users = useSelector(state => state.users)
    console.log(users);

    return (
        <>
        <span>Hello</span>
            {
                users.map((u) => {
                    return (
                        <div>
                            <span>{u.email}</span>
                            <span>{u.details.name}</span>
                        </div>
                    );
                })
            }
        </>
    );
}

export default UserProfile;
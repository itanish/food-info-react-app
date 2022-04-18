import {useSelector} from "react-redux";
import {getUserByEmail} from "../../actions/user_actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const UserProfile = () => {
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    useEffect(() => {
        getUserByEmail(dispatch, "rajat@mail.com");
    }, []);
    console.log(users);

    return (
        <>
            {
                users.map((u) => {
                    return (
                        <div>
                            <span>{u.details.name}</span>
                        </div>
                    );
                })
            }
        </>
    );
}

export default UserProfile;
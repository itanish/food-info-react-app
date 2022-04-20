import './style.css'
import { createUser } from '../../actions/user_actions'
import { useDispatch } from 'react-redux'

const Register = () => {
    let user = {}
    const dispatch = useDispatch();
    const registerUser = () => {
        console.log(user)
        createUser(dispatch,user);
    }

    const nameOnChangeHandler = (name) => {
        user.name = name;
    }

    const emailOnChangeHandler = (email) => {
        user.email = email;
    }

    const passwordOnChangeHandler = (password) => {
        user.password = password;
    }
    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="Full Name" onChange={(event) => {
                    nameOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" placeholder="Email" onChange={(event) => {
                    emailOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password" onChange={(event) => {
                    passwordOnChangeHandler(event.target.value);
                }}/>
                </div>
            </div>
            <div className="footer">
                <button onClick={() => registerUser()} type="button" class="btn btn-primary">Register</button>
            </div>
        </div>      
      )
}
export default Register;
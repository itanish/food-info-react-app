import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/user_actions";
import NavigationBar from "../NavigationBar";

const EditUserusers = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const naigate = useNavigate();
    
    const saveusers = () => {
        console.log("Saving")
        const out = updateUser(dispatch,users);        
        naigate("/profile")
    };

    const nameOnChangeHandler = (value) => {
       users.name = value;
    }
    const emailOnChangeHandler = (value) => {
        users.email=value;
    }

    return (
      <>
        <NavigationBar />
        <div>
          <div className="row mb-2">
            <div className="col-1">
              <Link to="/tuiter/users">
                <span className="text-white">
                  <i class="fa fa-solid fa-window-close"></i>
                </span>
              </Link>
            </div>
            <div className="col-11">
              <span className="text-white">
                {" "}
                <strong className="text-white">Edit users</strong>
              </span>
              <button
                type="button"
                onClick={() => saveusers()}
                class="btn btn-light btn-sm float-end wd-button-save"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="wd-div">
          <label for="name" className="text-muted">
            Name
          </label>
          <br />
          <input
            id="name"
            type="text"
            onChange={(event) => {
              nameOnChangeHandler(event.target.value);
            }}
            className="form-control wd-input text-white bg-transparent"
            defaultValue={users.name}
          ></input>
        </div>
        <div className="wd-div">
          <label for="bio" className="text-muted">
            Email
          </label>
          <br />
          <textarea
            id="bio"
            onChange={(event) => {
              emailOnChangeHandler(event.target.value);
            }}
            className="form-control wd-input text-white bg-transparent"
            defaultValue={users.email}
          ></textarea>
        </div>
      </>
    );
};
export default EditUserusers;
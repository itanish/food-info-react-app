import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../actions/user_actions";

const EditUserusers = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const saveusers = () => {
        updateUser(dispatch,users);
    };

    const nameOnChangeHandler = (value) => {
       users.name = value;
    }
    const emailOnChangeHandler = (value) => {
        users.email=value;
    }
    // const locationOnChangeHandler = (value) => {
    //     users.location=value;
    // }
    // const websiteOnChangeHandler = (value) => {
    //     users.website=value;
    // }

    // const dateOnChangeHandler = (value) => {
    //     users.dateOfBirth=value;
    // }

    return (
    <>
        <div>
                <div className="row mb-2">
                    <div className="col-1">
                        <Link to="/"><span className="text-white"><i class="fa fa-solid fa-window-close"></i></span></Link>
                    </div>
                    <div className="col-11">
                    <span className="text-white"> <strong className="text-white">Edit users</strong></span>
                    <Link to="/"><button type="button" onClick={() => saveusers()} class="btn btn-light btn-sm float-end wd-button-save">Save</button></Link>
                    </div>
                    
                </div>
            </div>
            {/* <div>
                <img src={users.bannerPicture} className="wd-bannerPicture" alt="" ></img>
            </div>
            <div className="mt-2">
                <img src={users.usersPicture} className="wd-usersPicture" alt=""></img>
            </div> */}
            <div className="wd-div">
                <label for="name" className="text-muted">Name</label><br/>
                <input id="name" type="text" onChange={(event) => {
                    nameOnChangeHandler(event.target.value);
                }} className="form-control wd-input text-white bg-transparent" defaultValue={users.name}></input>
            </div>
            <div className="wd-div">
                <label for="bio" className="text-muted">Email</label><br/>
                <textarea id="bio" onChange={(event) => {
                    emailOnChangeHandler(event.target.value);
                }}  className="form-control wd-input text-white bg-transparent" defaultValue={users.email}></textarea>
            </div>
            {/* <div className="wd-div">
                <label for="location" className="text-muted">Location</label><br/>
                <input id="location" onChange={(event) => {
                    locationOnChangeHandler(event.target.value);
                }}  type="text" className="form-control wd-input text-white bg-transparent" defaultValue={users.location}></input>
            </div>
            <div className="wd-div">
                <label for="date" className="text-muted">Date of Birth</label><br/>
                <input id="date" onChange={(event) => {
                    dateOnChangeHandler(event.target.value);
                }} type="date" className="form-control wd-input text-white bg-transparent" defaultValue={users.dateOfBirth}></input>
            </div>
            <div className="wd-div">
                <label for="website" className="text-muted">Website</label><br/>
                <input id="website" onChange={(event) => {
                    websiteOnChangeHandler(event.target.value);
                }}  type="text" className="form-control wd-input text-white bg-transparent" defaultValue={users.website}></input>
            </div> */}
    </>
    );
};
export default EditUserusers;
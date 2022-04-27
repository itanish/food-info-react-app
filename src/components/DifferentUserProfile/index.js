import React, {useEffect, useLayoutEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { getUserById } from '../../service/user_service';
import NavigationBar from '../NavigationBar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DifferentUserProfile = () => {
    const params = useParams();
    const userId = params['uid'];
    const navigate = useNavigate();
    const [users, setUserData] = useState();

    useEffect(() => {
        console.log("inside useeffect")
        const getDataFromServer = async () => {
            console.log("Getting data")
            await getUserById(userId).then((data) => {
                console.log("found")
                setUserData(data);
            })
        }
        getDataFromServer();
    }, []);

    const [input, setInput] = useState("");

    const routeChange = () => {
      let path = `searchUsers/${input}`;
      navigate(path);
    };

    console.log("data", users)

    let name = "";
    let email = "";

    if (users) {
        name = users[0].name
        email = users[0].email
    }

    return (
      <>
        <NavigationBar />

        {/* This is the start of the search bar */}
        <div>
          <div className="row height d-flex justify-content-center align-items-center">
            <div className="col-md-8 mt-5 mb-5">
              <div className="search">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for fellow users!"
                  value={input}
                  onInput={(e) => setInput(e.target.value)}
                />

                <button className="btn btn-primary" onClick={routeChange}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* This is the end of the search bar */}

        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  alt="Profile"
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span class="font-weight-bold">{name}</span>
                <span class="text-black-50">{email}</span>
              </div>
            </div>
            <div class=" col-9 col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Details</h4>
                  <div className='d-block'>
                    <span class="font-weight-bold">{name}</span>
                    <span class="text-black-50">{email}</span>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/editProfile">
          <button type="button">Edit Profile</button>
        </Link>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="/addmeal">
          <button type="button">Add Meal</button>
        </Link>
      </>
    );
}

export default DifferentUserProfile;
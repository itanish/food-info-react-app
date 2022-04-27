import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLoggedInUserDetails, getUserByName } from '../../service/user_service';
import { Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import NavigationBar from '../NavigationBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SearchUser = () => {
    const params = useParams()

    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);

    const routeChange = (uid) => {
      let path = `${window.location.origin}/profile/${uid}`;
      // let path = `../../profile/${uid}`;
      navigate(path);
    };


    useEffect(() => {
        console.log("Effect");
        const getDataFromServer = async (name) => {
          console.log("Getting data from server")
          console.log("server", name);
          console.log("Function", name);
          const userDetails = await getUserByName(name);
          console.log(userDetails);
          return userDetails;
        };
        const userDetails = getLoggedInUserDetails();
        if (userDetails === null || userDetails === undefined) {
          navigate("/login");
        } else {
          getDataFromServer(params["name"]).then((data) => {
              setAllUsers(data)
          });
        }
    }, []);
    
    console.log("out", allUsers)
    return (
      <Container>
        <NavigationBar />
        <h3 className="mt-3">Search Results</h3>
        <Row>
          <div>
            <ListGroup>
              {/* {JSON.stringify(allUsers)} */}
              {allUsers.map((user) => (
                <Link to={`../../profile/${user._id}`}>
                  <ListGroupItem>
                    {user.name} ({user.role})
                  </ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </div>
        </Row>
      </Container>
    );
}

export default SearchUser;
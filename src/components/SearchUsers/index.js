import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByName } from '../../service/user_service';
import { Card, Row, Col, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import NavigationBar from '../NavigationBar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SearchUser = () => {
    const params = useParams()
    // console.log(params['name'])
    // const out = [];
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        console.log("Effect");
        const getDataFromServer = async (name) => {
            console.log("Getting data from server")
            console.log("server", name);
          // const name = params.name;
          console.log("Function", name);
          const userDetails = await getUserByName(name);
          console.log(userDetails);
          return userDetails;
        };
        getDataFromServer(params["name"]).then((data) => {
            // out.push(data)
            setAllUsers(JSON.parse(data));
        });
    }, []);
    
    // console.log("out", allUsers)
    return (
      <Container>
        <NavigationBar />
        <h3 className="mt-3">Search Results</h3>
        <Row>
          <div>
            <ListGroup>
              {allUsers.map((user) => (
                <ListGroupItem>{user.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Row>
      </Container>
    );
}

export default SearchUser;
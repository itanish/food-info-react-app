import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams, Link} from "react-router-dom";
import "../../config.js"
import NavigationBar from "../NavigationBar";
import { getLoggedInUserDetails } from "../../service/user_service.js";

const LikedMeals = () => {

    const params = useParams();
    const apiKey = global.config.apiKeys.key1;
    
    const [meals, setMeals] = useState([{
        _id: "",
        name: "No Meals Added",
    }]);
    const serverURL = global.config.serverURL;

    const userDetails = getLoggedInUserDetails();

    useEffect(() => {

        let mealList = [];

        const userDetails = getLoggedInUserDetails();

        if (JSON.parse(localStorage.getItem("user")) !== undefined
            && JSON.parse(localStorage.getItem("user")) !== null && JSON.parse(localStorage.getItem("user"))) {

            console.log(JSON.parse(localStorage.getItem("user")))
            JSON.parse(localStorage.getItem("user")).meals.map(async (rId) => {

                const response = await fetch(
                    `${serverURL}/api/mealData/${rId}`)

                console.log(`${serverURL}/api/mealData/${rId}`)

                const mealDataServer = await response.json();

                console.log("Meal Dataaa")

                console.log(mealDataServer)

                mealList.push(mealDataServer[0]);

                console.log(mealDataServer)

                setMeals(mealList);

            });

        }

    }, [])

    return(
        <>
            <h3 className="mt-3">Meals Liked By You:</h3>
            <Row>
                {meals.map((recipe, k) => (
                    <Col key={k} xs={12} md={4} lg={3} className="mt-3">
                        <Card >
                            <Card.Img width={100} height={200} src={`https://source.unsplash.com/random/100${k}×100${k}/?food`} />

                            <Card.Body>
                                <Link to={'../../meal/' + recipe._id}>
                                    <Card.Title>{recipe.name}</Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
            )
}

export default LikedMeals;


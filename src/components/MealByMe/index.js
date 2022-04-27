import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams} from "react-router-dom";
import "../../config.js"
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const MealByMe = () => {

    const [recipe, setRecipe] = useState([]);
    const serverURL = global.config.serverURL;
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {

            const userID = JSON.parse(localStorage.getItem("loggedInUser"))._id;

            const response = await fetch(
                `${serverURL}/api/meals/${userID}`)

            const recipeData = await response.json()
            setRecipe(recipeData);
        }

        fetchData()
    }, [])

    return(
        <Container>

            <h3 className="mt-3">Meal Plans Created By You:</h3>

            <Row>
                {recipe.map((recipe, k) => (
                    <Col key={k} xs={12} md={4} lg={3} className="mt-3">
                        <Card >
                            <Card.Body>
                                <Link to={'../../meal/' + recipe._id}>
                                    <Card.Title>{recipe.name}</Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className={"mb-5"}></div>

        </Container>
    )
}

export default MealByMe;


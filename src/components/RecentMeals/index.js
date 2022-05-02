import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams} from "react-router-dom";
import "../../config.js"
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const RecentMeals = () => {

    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const serverURL = global.config.serverURL;
    const apiKey = global.config.apiKeys.key1;
    
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${serverURL}/api/recentmeals/`)
            const recipeData = await response.json()
            setRecipe(recipeData);

        }

        fetchData()
    }, [])
    

    return(
        <>
            <h3 className="mt-3">Recently Added Meals:</h3>
            <Row className={"mb-4"}>
                {recipe.map((recipe, k) => (
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

export default RecentMeals;


import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams} from "react-router-dom";
import "../../config.js"
import "./searchresult.css"
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const SearchResult = () => {

    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const apiKey = global.config.apiKeys.key1;


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${params.query}&number=12&apiKey=${apiKey}`)
            const recipeData = await response.json()

            console.log(recipeData.results)

            if (recipeData.results.length === 0) {
                setRecipe([{
                    image: "",
                    title: "No Results Found!"
                }]);

            }
            else {
                setRecipe(recipeData.results);
            }

        }

        fetchData()
    }, [])

    return(
        <Container>
            <NavigationBar/>
            <h3 className="mt-3">Search Results for: "{params.query}"</h3>
            <Row>
                {recipe.map((recipe, k) => (
                    <Col key={k} xs={12} md={4} lg={3} className="mt-3">
                        <Card >
                            <Card.Img src={recipe.image} />

                            <Card.Body>
                                <Link to={'../../recipe/' + recipe.id}>
                                    <Card.Title>{recipe.title}</Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default SearchResult;


import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams} from "react-router-dom";

const SearchResult = () => {

    const [recipe, setRecipe] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${params.query}&number=15&apiKey=695103bbacda486d88166862e1adcd8e`)
            const recipeData = await response.json()
            setRecipe(recipeData.results)
            console.log(recipeData);
        }
        fetchData()
    }, [])


    return(
        <Container>
            <h3>Search Results</h3>
            <Row>
                {recipe.map((recipe, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src={recipe.image} />

                            <Card.Body>
                                <a href={'http://localhost:3000/recipe/' + recipe.id}>
                                    <Card.Title>{recipe.title}</Card.Title>
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default SearchResult;


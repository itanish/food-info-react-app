import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import "../../config.js"

const RandomRecipes = () => {

    const [recipe, setRecipe] = useState([]);
    const apiKey = global.config.apiKeys.key1;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?number=4&apiKey=${apiKey}`)
            const recipeData = await response.json()
            setRecipe(recipeData.recipes)
            console.log(recipeData);
        }
        fetchData()
    }, [])


    return(
        <Container>
            <h3>Random Recipies</h3>
            <Row>
                {recipe.map((recipe, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src={recipe.image} />

                            <Card.Body>
                                <a href={'http://localhost:3000/recipe/' + recipe.id}>
                                    <Card.Title>{recipe.title}</Card.Title>
                                </a>

                                <Card.Text><p>{Parser (recipe.summary.substring(0, 200))} {recipe.summary.length >= 200 && '...'}</p></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default RandomRecipes;


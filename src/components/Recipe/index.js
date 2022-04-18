import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';

const Recipe = () => {

    const [recipe, setRecipe] = useState({
        title:'',
        summary:'',
        image:''
                                         });
    const params = useParams();

    const apiKey = global.config.apiKeys.key1;

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`)

            const recipeData = await response.json()
            setRecipe(recipeData)
            console.log(recipeData);
        }
        fetchData()
    }, [])


    return(
        <Container>
            <h3>{recipe.title}</h3>
                {
                    <Col>
                        <Card >
                            <Card.Img src={recipe.image} />

                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Text>{Parser (recipe.summary)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                }
        </Container>
    )
}
export default Recipe;


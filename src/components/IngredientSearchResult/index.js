import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import {useParams, Link} from "react-router-dom";
import "../../config.js"
import "./searchresult.css"
import NavigationBar from "../NavigationBar";
import { loadState } from "../../service/user_service.js";

const IngredientSearchResult = () => {

    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const apiKey = global.config.apiKeys.key1;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/search?query=${params.query}&number=10&sortDirection=desc&apiKey=${apiKey}`)
            const recipeData = await response.json()
            console.log(recipeData.results);
            setRecipe(recipeData.results);
        }
        const userDetails = loadState();
        console.log(userDetails)
        fetchData()
    }, [])

    return(
        <Container>
            <NavigationBar/>
            <h3 className="mt-3">Search Results</h3>
            <Row>
                <ul className="list-group">

                {recipe.map((recipe, k) => (
                        <Link to={'/ingredient/' + recipe.id}>
                            <li className="list-group-item">{recipe.name}</li>
                        </Link>
                ))}

                </ul>

            </Row>

        </Container>
    )
}

export default IngredientSearchResult;


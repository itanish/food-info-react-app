import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import './index.css';

const Ingredient = () => {

    const [ingredient, setIngredient] = useState({
        name:'', estimatedCost: ''
    });

    const [nutrition, setNutrition] = useState([]);

    const params = useParams();

    const apiKey = global.config.apiKeys.key1;

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/${params.id}/information?amount=1&apiKey=${apiKey}`)
            const recipeData = await response.json()
            setIngredient(recipeData)
            console.log(recipeData)
            setNutrition(recipeData.nutrition.nutrients);
        }
        fetchData()
    }, [])

    return(
        <Container>
            <h2 className={"mt-4 mb-3 heading"}>Food Item: {ingredient.name}</h2>

            <h4> Estimated Cost: {ingredient.estimatedCost.value} {ingredient.estimatedCost.unit}</h4>
            <h2 className={"mt-4 mb-3"}>Nutrition Values:</h2>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Nutrient Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Unit</th>
                </tr>
                </thead>
                {nutrition.map((nutrition, k) => (

                            <tbody>
                            <tr>
                                <th scope="row">{nutrition.name}</th>
                                <td>{nutrition.amount}</td>
                                <td>{nutrition.unit}</td>
                            </tr>

                            </tbody>
                ))}
            </table>

        </Container>
    )
}
export default Ingredient;


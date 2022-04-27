import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import { saveRecipe } from "../../actions/user_actions.js";
import {Link} from 'react-router-dom'
import NavigationBar from "../NavigationBar";
import './index.css';

const Meal = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();    

    const [recipe, setRecipe] = useState({
                                             name:'',
                                             recipe:[],
                                             nutritionist_name:'',
                                         });
    const serverURL = global.config.serverURL;


    const params = useParams();

    console.log("Meal Page")

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                `${serverURL}/api/mealData/${params.id}`)
                
            const recipeData = await response.json()
            setRecipe(recipeData[0])
            console.log(recipeData);
        }

        fetchData()
    }, [])

    return(
        <div className={"container-fluid"}>
            <NavigationBar/>
            <h1 className={"heading mt-4 mb-4"}>{recipe.name}</h1>

            <img className={"image"} src={"https://source.unsplash.com/random/100×100/?food"}/>

            <h3 className={"mt-4"}>Meal Made By:</h3>
            <p>{recipe.nutritionist_name}</p>

            <h3 className={"mt-4"}>Recipes In this Meal:</h3>
            {
                recipe.recipe.map((recipe, k) => (
                    <a href={'http://localhost:3000/recipe/' + recipe}>
                        <li className="list-group-item"><span className={"color-green"}>Recipe {k+1}</span></li>
                    </a>
                ))
            }
        </div>
    )
}
export default Meal;


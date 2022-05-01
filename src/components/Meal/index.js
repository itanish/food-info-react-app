import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import {Link} from 'react-router-dom'
import NavigationBar from "../NavigationBar";
import './index.css';
import { saveMeal,updateUser } from "../../actions/user_actions.js";
import { useNavigate } from "react-router-dom";

const Meal = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();    
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
                                             name:'',
                                             recipe:[],
                                             nutritionist_name:'',
                                         });
    const serverURL = global.config.serverURL;


    const params = useParams();

    console.log("Meal Page")

    const unsaveToUser = (id) => {
        users.meals = users.meals.filter(item => item !== id);
        updateUser(dispatch,users);
    }

    const saveToUser = (id,name) => {
        if(localStorage.getItem("user")!==null) {
            if(users.meals===undefined) {
                users.meals = [];
            }
    
            if(!users.meals.includes(id)) {
                users.meals.push(id);
                console.log('saving',users);
                saveMeal(dispatch,users);
                
            }
            else{
                console.log('not saving as user already have this meal');
            }
        }
        else {
            navigate("/login");
        }
    }
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
            <h1 className={"heading mt-4 mb-4"}>{recipe.name} <button className="btn btn-light" onClick={() => saveToUser(params.id,recipe.name)}>Save</button><button className="btn btn-light" onClick={() => unsaveToUser(params.id,recipe.name)}>UnSave</button></h1>

            <img className={"image-meal"} src={"https://source.unsplash.com/random/100×100/?food"}/>

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


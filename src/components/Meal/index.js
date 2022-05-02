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
import { getLoggedInUserDetails } from "../../service/user_service.js";

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

    const [unSaved, setUnSaved] = useState(true);

    const [saveText, setSaveText] = useState("Save");

    const params = useParams();

    console.log("Meal Page")

    const unsaveToUser = (id) => {

        if (getLoggedInUserDetails() !== null && getLoggedInUserDetails() !== undefined) {

        if (getLoggedInUserDetails().role !== "nutritionist") {
            users.meals = users.meals.filter(item => item !== id);
            updateUser(dispatch,users);
        }
    }
    }

    const checkIfUnsaved = (id) => {

        if (getLoggedInUserDetails() !== null && getLoggedInUserDetails() !== undefined) {

        if (getLoggedInUserDetails().role !== "nutritionist") {

            if(localStorage.getItem("user")===null || !getLoggedInUserDetails().meals.includes(id))  {
                
                setUnSaved(true);
                setSaveText("Save");
                console.log("HEREEEEEE: ",{saveText})
            }
            else{
                setUnSaved(false);
                setSaveText("Unsave");
                console.log("HEREEEEEE in Unsave: ",{saveText})
            }
    }
    }
    }

    const checkIfNutritionist = () => {
        
        console.log("out here")

        if (getLoggedInUserDetails !== null && getLoggedInUserDetails !== undefined) {
            if (getLoggedInUserDetails.role === "nutritionist") {
                console.log("In here")
                return true;
            }
        }

        return false;
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
                setUnSaved(false);
                setSaveText("Unsave");
            }
            else{
                users.meals = users.meals.filter(item => item !== id);
                updateUser(dispatch,users);
                setUnSaved(true);
                setSaveText("Save");
            }
        }
        else {
            navigate("/login");
        }
    }

    useEffect(() => {
        checkIfUnsaved(params.id);
        const fetchData = async () => {
            const response = await fetch(
                `${serverURL}/api/mealData/${params.id}`)
                
            const recipeData = await response.json()
            setRecipe(recipeData[0])
            console.log(recipeData);
            checkIfUnsaved(params.id);
        }

        fetchData()
    }, [])

    return(

        <>

        <NavigationBar/>

        <div className={"container-fluid"}>
            <h1 className={"heading mt-4 mb-4"}>{recipe.name}

            {
                !checkIfNutritionist()?
                <button className="btn btn-primary heading-button-left" onClick={() => saveToUser(params.id,recipe.name)}>{saveText}</button>
                :""
            }
             {/* <button className="btn btn-light" onClick={() => unsaveToUser(params.id,recipe.name)}>UnSave</button> */}
             </h1>

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

        </>
    )
}
export default Meal;


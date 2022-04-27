import { Card, Row, Col, Container, Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import './index.css';
import { saveRecipe } from "../../actions/user_actions.js";
import { saveUserForRecipe } from "../../service/recipe_service.js";
import {Link} from 'react-router-dom'
import NavigationBar from "../NavigationBar";

const Recipe = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const serverURL = global.config.serverURL;

    const [recipe, setRecipe] = useState({
                                             title:'',
                                             summary:'',
                                             image:'',
                                             instructions:'',
                                             extendedIngredients:[]

                                         });


    const [recipeServer, setRecipeServer] = useState({
                                                         recipeId:'',
                                                         likedByName:[],
                                         });




    const [similarID, setSimilarID] = useState([]);

    const [similar, setSimilar] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const params = useParams();

    const apiKey = global.config.apiKeys.key1;

    const saveToUser = (id, recipe) => {
        console.log(users);
        // TODO local storage use
        if(localStorage.getItem("user")!==null) {
            if(users.recipe===undefined) {
                users.recipe = [];
            }

            if(!users.recipe.includes(id)) {
                console.log('saving');
                users.recipe.push(id);
                saveRecipe(dispatch,users);

                let recipes = {};
                recipes.recipeId = id;
                recipes.recipeName = recipe;
                recipes.likedByName = JSON.parse(localStorage.getItem("user")).name;

                console.log("Recipe adding user " +recipes);
                console.log(recipes);
                saveUserForRecipe(recipes);
            }
            else{
                console.log('not saving as user already have it');
            }
        }
        else {
            alert("Please login");
        }
    }

    let similarList = [];


    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`)

            const recipeData = await response.json()
            setRecipe(recipeData)
            console.log(recipeData);

            const response2 = await fetch(
                `https://api.spoonacular.com/recipes/${params.id}/similar?apiKey=${apiKey}&number=3`)

            const similarData = await response2.json()
            setSimilarID(similarData)

            const response3 = await fetch(
                `${serverURL}/api/recipeserver/${params.id}`)

            const recipeDataServer = await response3.json();
            setRecipeServer(recipeDataServer[0]);
            console.log(recipeDataServer)

        }
        fetchData()
    }, [])

    return(
        <div className={"container-fluid"}>
            <NavigationBar/>
            <h1 className={"heading mt-4 mb-4"}>{recipe.title}
                <Button className="primary mr-3" onClick={() => saveToUser(params.id,recipe.title)}>Save
                </Button>
                <Button variant="primary ml-3" onClick={handleShow}>
                    Liked By
                </Button>
            </h1>


            <img className={"image"} src={recipe.image}/>

            <h3 className={"mt-4"}>Summary:</h3>
            <p>{Parser (recipe.summary)}</p>

            <h3 className={"mt-4"}>Instructions:</h3>
            <p>{Parser (recipe.instructions)}</p>

            <h3 className={"mt-4"}>Ingredients:</h3>

            <ul className="list-group">

                {
                    recipe.extendedIngredients.map((recipe, k) => (
                        <a href={'http://localhost:3000/ingredient/' + recipe.id}>
                        <li className="list-group-item">{recipe.original}</li>
                        </a>
                ))
                }

            </ul>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Liked By:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group mb-5">
                        {
                            recipeServer.likedByName.map((name, k) => (
                                <li className="list-group-item"><span className={"color-green"}>{name}</span></li>
                            ))
                        }
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <h3 className="mt-4 mb-4">Similar Recipes:</h3>

            <ul className="list-group mb-5">
                {
                    similarID.map((recipe, k) => (
                        <a href={'http://localhost:3000/recipe/' + recipe.id}>
                            <li className="list-group-item"><span className={"color-green"}>{recipe.title}</span></li>
                        </a>
                    ))
                }
            </ul>


        </div>
    )
}
export default Recipe;


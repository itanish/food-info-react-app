import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import './index.css';
import { saveRecipe } from "../../actions/user_actions.js";


const Recipe = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();    

    const [recipe, setRecipe] = useState({
                                             title:'',
                                             summary:'',
                                             image:'',
                                             instructions:'',
                                             extendedIngredients:[]

                                         });

    const [similarID, setSimilarID] = useState([]);

    const [similar, setSimilar] = useState([]);

    const params = useParams();

    const apiKey = global.config.apiKeys.key1;

    const saveToUser = (id) => {
        console.log(users);
        // TODO local storage use
        
        if(users.recipe===undefined) {
            users.recipe = [];
        }

        if(!users.recipe.includes(id)) {
            console.log('saving');
            users.recipe.push(id);
            saveRecipe(dispatch,users);
        }
        else{
            console.log('not saving');
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
            console.log("Similar Data:")
            console.log(similarData);



        }
        fetchData()
    }, [])

    return(
        <div className={"container-fluid"}>
            <h1 className={"heading mt-4 mb-4"}>{recipe.title} <button className="btn btn-light" onClick={() => saveToUser(params.id)}>Save</button></h1>

            <img className={"image"} src={recipe.image}/>

            <h3 className={"mt-4"}>Summary:</h3>
            <p>{Parser (recipe.summary)}</p>

            <h3 className={"mt-4"}>Instructions:</h3>
            <p>{Parser (recipe.instructions)}</p>

            <h3 className={"mt-4"}>Ingredients:</h3>

            <ul className="list-group">

                {
                    recipe.extendedIngredients.map((recipe, k) => (

                    <li className="list-group-item">{recipe.original}</li>
                ))
                }

            </ul>


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


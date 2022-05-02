import { Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Parser from 'html-react-parser';
import { useParams } from "react-router-dom";
import '../../config.js';
import './index.css';
import NavigationBar from "../NavigationBar";
import { saveIngredient,updateUser } from "../../actions/user_actions.js";
import { saveUserForIngredient} from "../../service/ingredient_service.js";
import { getLoggedInUserDetails } from "../../service/user_service.js";

const Ingredient = () => {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState({
        name:'', estimatedCost: ''
    });

    const [nutrition, setNutrition] = useState([]);

    const [unSaved, setUnSaved] = useState(true);

    const [saveText, setSaveText] = useState("Save");

    const params = useParams();

    const apiKey = global.config.apiKeys.key1;

    const checkIfUnsaved = (id) => {


        if (getLoggedInUserDetails() !== null && getLoggedInUserDetails() !== undefined) {

            if (getLoggedInUserDetails().role !== "nutritionist") {

        if(localStorage.getItem("user")===null || !getLoggedInUserDetails().ingredients.includes(id))  {
            
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

        let users = getLoggedInUserDetails();

        if(localStorage.getItem("user")!==null) {
            if(users.ingredients===undefined) {
                users.ingredients = [];
            }
    
            if(!users.ingredients.includes(id)) {

                let users = getLoggedInUserDetails();

                users.ingredients.push(id);
                console.log('saving ingredients',users);
                saveIngredient(dispatch,users);

                console.log(users);
                console.log("New User")
                console.log(users);
                console.log(localStorage.getItem("users"));

                let ingred = {};
                ingred.ingredientId = id;
                ingred.ingredientName = name;
                ingred.likedBy= {}
                ingred.likedBy.userId = JSON.parse(localStorage.getItem("user"))["_id"];
                ingred.likedBy.userName = JSON.parse(localStorage.getItem("user")).name;
                
                console.log("Ingred adding user " +ingred);
                console.log(ingred);
                saveUserForIngredient(ingred);
                setUnSaved(false);
                setSaveText("Unsave");
    
            }
            else{
                console.log("Users",users)
                console.log("ID to be deleted: ",id)
                users.ingredients = users.ingredients.filter(item => item !== id);
                console.log("Users Updated",users)
                updateUser(dispatch,users);
                setUnSaved(true);
                setSaveText("Save");
    
            }
        }
        else {
            alert("Please login");
        }
    }

    useEffect(() => {
        checkIfUnsaved(params.id);
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
            <NavigationBar/>
            <h2 className={"mt-4 mb-3 heading"}>Food Item: {ingredient.name} 
            {
                !checkIfNutritionist()?
                <button className="btn btn-primary heading-button-left" onClick={() => saveToUser(params.id,ingredient.name)}>{saveText}</button>
                :""
            }
            </h2>

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


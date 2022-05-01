import {useSelector} from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { getLoggedInUserDetails } from "../../service/user_service";
import "./profile.css"
import { useState } from "react";

const apiKey = global.config.apiKeys.key1;


const UserProfile = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    let navigate = useNavigate();
    const [input, setInput] = useState("");
    const [isUserNutritionist, setUserNutritionist] = useState(false);
    const serverURL = global.config.serverURL;

    const routeChange = () => {
      let path = `searchUsers/${input}`;
      navigate(path);
    };


    const [recipe, setRecipe] = useState([{
        recipeId: "",
        recipeName: "",
    }]);

    const [meals, setMeals] = useState([{
        _id: "",
        name: "",
    }]);

    const [ingredient, setIngredient] = useState([{
        ingredientId: "",
        ingredientName: "",
    }]);


    const userDetails = getLoggedInUserDetails();

    console.log(userDetails)
    useEffect(() => {

          if (userDetails !== undefined && userDetails !== null) {
            dispatch({
              type: "LOGIN_USER",
              user: userDetails,
            });
          }

          let recipeList = [];
        let mealList = [];
        let ingredientList = [];

          userDetails.recipe.map(async (rId) => {
              const response = await fetch(
                  `${serverURL}/api/recipeserver/${rId}`)

              console.log(`${serverURL}/api/recipeserver/${rId}`)

              const recipeDataServer = await response.json();

              recipeList.push(recipeDataServer[0]);

              console.log(recipeDataServer)

              setRecipe(recipeList);

          });

        userDetails.meals.map(async (rId) => {

            const response = await fetch(
                `${serverURL}/api/mealData/${rId}`)

            console.log(`${serverURL}/api/mealData/${rId}`)

            const mealDataServer = await response.json();

            console.log("Meal Dataaa")

            console.log(mealDataServer)

            mealList.push(mealDataServer[0]);

            console.log(mealDataServer)

            setMeals(mealList);

        });

        userDetails.ingredients.map(async (rId) => {

            const response = await fetch(
                `${serverURL}/api/ingredientData/${rId}`)

            console.log(`${serverURL}/api/ingredientData/${rId}`)

            const ingredientDataServer = await response.json();

            console.log("ingredients Dataaa")

            console.log(ingredientDataServer)

            ingredientList.push(ingredientDataServer[0]);

            console.log(ingredientDataServer)

            setIngredient(ingredientList);

        });


    }, []);



    // console.log("User Profile:",users);

    return (
      <>
        <NavigationBar />

        {/* This is the start of the search bar */}
        <div>
          <div className="row height d-flex justify-content-center align-items-center">
            <div className="col-md-8 mt-5 mb-5">
              <div className="search">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for fellow users!"
                  value={input}
                  onInput={(e) => setInput(e.target.value)}
                />

                <Link to={`/searchUsers/${input}`}>
                  <button className="btn btn-primary">
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* This is the end of the search bar */}

        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  alt="Profile"
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span class="font-weight-bold">{users.name}</span>
                <span class="text-black-50">{users.email}</span>
              </div>
            </div>
            <div class=" col-9 col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Details</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <div class="d-block justify-content-between align-items-center mb-3">

                      <h5 class="text-right">Liked Recipes</h5>
                        <ul className="list-group mb-5">
                            {
                                recipe.map((recipe, k) => (
                                    <Link to={"../../recipe/" + recipe.recipeId}>
                                    <li className="list-group-item"><span className={"color-green"}>{recipe.recipeName}</span></li>
                                    </Link>
                                ))
                            }
                        </ul>

                        <h5 className="text-right">Liked Meals:</h5>
                        <ul className="list-group mb-5">
                            {
                                meals.map((recipe, k) => (
                                    <Link to={"../../meal/" + recipe._id}>
                                        <li className="list-group-item"><span
                                            className={"color-green"}>{recipe.name}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>

                        <h5 className="text-right">Liked Ingredients:</h5>
                        <ul className="list-group mb-5">
                            {
                                ingredient.map((recipe, k) => (
                                    <Link to={"../../ingredient/" + recipe.ingredientId}>
                                        <li className="list-group-item"><span
                                            className={"color-green"}>{recipe.ingredientName}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/editProfile">
          <button type="button">Edit Profile</button>
        </Link>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        {isUserNutritionist ?
        <Link to="/addmeal">
          <button type="button">Add Meal</button>
        </Link>
        : null}
      </>
    );
}

export default UserProfile;
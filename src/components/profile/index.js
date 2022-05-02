import {useSelector} from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { getLoggedInUserDetails } from "../../service/user_service";
import "./profile.css"
import { useState } from "react";
import MealByMe from "../MealByMe";

const apiKey = global.config.apiKeys.key1;


const UserProfile = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    let navigate = useNavigate();
    const [input, setInput] = useState("");
    // const [isUserNutritionist, setUserNutritionist] = useState(false);
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
		const getData = async () => {
          if (userDetails.role === "user") {
          userDetails.recipe.map(async (rId) => {
              const response = await fetch(
                  `${serverURL}/api/recipeserver/${rId}`)

            //   console.log(`${serverURL}/api/recipeserver/${rId}`)

              const recipeDataServer = await response.json();

              recipeList.push(recipeDataServer[0]);

            //   console.log(recipeDataServer)

              setRecipe(recipeList);

          });
        

        userDetails.meals.map(async (rId) => {

            const response = await fetch(
                `${serverURL}/api/mealData/${rId}`)

            // console.log(`${serverURL}/api/mealData/${rId}`)

            const mealDataServer = await response.json();

            // console.log("Meal Dataaa")

            // console.log(mealDataServer)

            mealList.push(mealDataServer[0]);

            // console.log(mealDataServer)

            setMeals(mealList);

        });

        userDetails.ingredients.map(async (rId) => {

            const response = await fetch(
                `${serverURL}/api/ingredientData/${rId}`)

            // console.log(`${serverURL}/api/ingredientData/${rId}`)

            const ingredientDataServer = await response.json();

            // console.log("ingredients Dataaa")

            // console.log(ingredientDataServer)

            ingredientList.push(ingredientDataServer[0]);

            // console.log(ingredientDataServer)

            setIngredient(ingredientList);

        });
		
      }
	}

	getData();
	

    }, []);

    const renderLikedRecipesAndIngredients = () => {
		console.log("Meals", meals);
    console.log("REcipe", recipe);
    console.log("Ingredients", ingredient);
      if (userDetails.role === "user") {
        return (
          <>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <h4>My Liked Recipes</h4>
                  <div className="mt-3">
                    <ul className="list-group mb-5">
                      {recipe &&
                        recipe.map((recipe, k) => {
                          if (recipe === null || recipe === undefined) {
                            console.log("No recipe details found");
                            return <></>;
                          }
                          return (
                            <Link to={"../../recipe/" + recipe.recipeId}>
                              <li className="list-group-item">
                                <span className={"color-green"}>
                                  {recipe.recipeName}
                                </span>
                              </li>
                            </Link>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <h4>My Liked Ingredients</h4>
                  <div className="mt-3">
                    <ul className="list-group mb-5">
                      {ingredient &&
                        ingredient.map((recipe, k) => {
							if (recipe === null || recipe === undefined) {
								console.log("No ingredient details found");
								return <></>;
							}
							return (
							<Link to={"../../ingredient/" + recipe.ingredientId}>
								<li className="list-group-item">
								<span className={"color-green"}>
									{recipe.ingredientName}
								</span>
								</li>
							</Link>
                        	);
						})}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
			<br/>
          </>
        );
      }
    }


    const renderMealsDetails = () => {
      if (userDetails.role === "user") {
        return (
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <h4>My Meal Plans</h4>
                <div className="mt-3">
                  <ul className="list-group mb-5">
                    {meals &&
                      meals.map((recipe, k) => {
						  if (recipe === null || recipe === undefined) {
							console.log("No meal details found");
							return <></>;
						}
						return (
                        <Link to={"../../meal/" + recipe._id}>
                          <li className="list-group-item">
                            <span className={"color-green"}>{recipe.name}</span>
                          </li>
                        </Link>
                      )
					  })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (userDetails.role === "nutritionist") {
          return (
            <div className="card">
				<div className="card-body">
					<div className="flex-column align-items-center text-center">
						<MealByMe />
					</div>
				</div>
			</div>
          );
      }
    }

    const renderUserDetails = () => {
		console.log(userDetails.role);
      if (userDetails.role === "user") {
        return (
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="Admin"
                  className="rounded-circle p-1 bg-primary"
                  width="110"
                />
                <div className="mt-3">
                  <h4>{users.name}</h4>
                  <h6>Role : {users.role.toUpperCase()}</h6>
                  <p className="text-secondary mb-1">Email : {users.email}</p>
                  <Link to="/editprofile">
                    <button className="btn btn-primary">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (userDetails.role === "nutritionist") {
        return (
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                  alt="Admin"
                  className="rounded-circle p-1 bg-primary"
                  width="110"
                />
                <div className="mt-3">
                  <h4>{users.name}</h4>
                  <h6>Role : {users.role.toUpperCase()}</h6>
                  <p className="text-secondary mb-1">Email : {users.email}</p>
                  <Link to="/editprofile">
                    <button className="btn btn-primary">Edit Profile</button>
                  </Link>
                  {/* <Link to="/addMeal">
                    <button className="btn btn-primary">Add Meal</button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }



    // console.log("User Profile:",users);

    return (
      <>
        <NavigationBar />
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
        <div className="container">
          <div className="main-body">
            <div className="row">
              <div className="col-lg-4">
                {renderUserDetails()}
              </div>
              <div className="col-lg-6">
                <div>
                  {renderLikedRecipesAndIngredients()}
                  {renderMealsDetails()}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default UserProfile;
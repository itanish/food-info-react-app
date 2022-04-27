import {useSelector} from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { loadState } from "../../service/user_service";
import "./profile.css"
import Parser from "html-react-parser";
import { useState } from "react";

const apiKey = global.config.apiKeys.key1;


const renderLikedRecipes = (recipe) => {
  console.log(recipe);
  return (
    <div className={"container-fluid"}>
      <Row>
        {recipe.map((recipe, k) => (
          <Col key={k} className="mt-3">
            <Card>
              <Card.Img src={recipe.image} />

              <Card.Body>
                <Link to={"../../recipe/" + recipe.id}>
                  <Card.Title>{recipe.title}</Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const UserProfile = () => {
    
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    let navigate = useNavigate();
    const [input, setInput] = useState("");

    const routeChange = () => {
      let path = `searchUsers/${input}`;
      navigate(path);
    };


    const [recipe, setRecipe] = useState([{
      title: "",
      summary: "",
      image: "",
      instructions: "",
      extendedIngredients: [],
    }]);
    
    useEffect(() => {
      
        const fetchData = async () => {
          const userDetails = loadState();
          if (userDetails !== undefined && userDetails !== null) {
            dispatch({
              type: "LOGIN_USER",
              user: userDetails,
            });
          }
          setRecipe([]);

          // Commenting to limit the number of calls to the API
          
          // const rId = userDetails.recipe[0];
          // userDetails.recipe.map(async (rId) => {
          //   const recipeList = recipe;
          //   const response = await fetch(`https://api.spoonacular.com/recipes/${rId}/information?apiKey=${apiKey}`);
          //   const recipeData = await response.json();
          //   // console.log(recipeData);
          //   recipeList.push(recipeData);
          //   console.log("list", recipeList);
          //   setRecipe(recipeList);  
          // });
          
        }
        fetchData()
      }, []);

    

    console.log("User Profile:",users);

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

                <button className="btn btn-primary" onClick={routeChange}>
                  Search
                </button>
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
                      {renderLikedRecipes(recipe)}
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
        <Link to="/addmeal">
          <button type="button">Add Meal</button>
        </Link>
      </>
    );
}

export default UserProfile;
import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import MealByMe from "../MealByMe"
import MealsBar from "../MealsBar"
import LikedMeals from "../LikedMeals"
import "./index.css"
import { useDispatch } from "react-redux";
import { getLoggedInUserDetails } from "../../service/user_service";
import React, { useEffect, useState } from 'react'

const HomeScreen = () => {
    
    const dispatch = useDispatch();
    const [isNutritionistRole, setIsNutritionist] = useState(false);
    const [loggedIn, setLogin] = useState(false);

    const isNutritionistRoleFunc = () => {
        return isNutritionistRole;
    }


    useEffect(() => {

        const userDetails = getLoggedInUserDetails();

        if (JSON.parse(localStorage.getItem("user")) !== undefined
            && JSON.parse(localStorage.getItem("user")) !== null) {

            setLogin(true);

        }

        // console.log(userDetails);

        if (userDetails !== undefined && userDetails !== null) {
            dispatch({
              type: "LOGIN_USER",
              user: userDetails,
            });
        }

        if (JSON.parse(localStorage.getItem("user")) !== null) {
            console.log(JSON.parse(localStorage.getItem("user")))
            if (JSON.parse(localStorage.getItem("user")).role === "nutritionist") {
                setIsNutritionist(true);
            }
        }
        else{
            setIsNutritionist(false);
        }

    }, []);

    return (
      <div>
        {/* <nav class="navbar navbar-expand-sm fixed-top navbar-light"> */}
          <NavigationBar />
        {/* </nav> */}

        <div className="jumbotron jumbotron-fluid text-white jumbotron-image shadow jumbo-image">
          <h1 className={"centered pt-5"}>
            <b>FoodPedia</b>
          </h1>

          <h3 className="p-3 centered-sub">Welcome to Food Encyclopedia.</h3>

          <Search />
        </div>

        <RandomRecipes />
        {isNutritionistRoleFunc() ? (
          <MealByMe />
        ) : (
          <div className="jumbotron jumbotron-fluid text-white jumbotron-image shadow jumbo-image-meal">
            <MealsBar />
          </div>
        )}

        {loggedIn && !isNutritionistRoleFunc() ? <LikedMeals /> : ""}

        <div className="jumbotron jumbotron-fluid text-white jumbotron-image shadow jumbo-image-ing">
          <h1 className="mb-4 mt-2 pt-3 p-3">
            Find calories and nutrient data for any food item below!.
          </h1>

          <IngredientsSearch />
        </div>
      </div>
    );
}
export default HomeScreen;


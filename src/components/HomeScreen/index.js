import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import MealByMe from "../MealByMe"
import MealsBar from "../MealsBar"
import { useDispatch } from "react-redux";
import { loadState } from "../../service/user_service";
import React, { useEffect, useState } from 'react'

const HomeScreen = () => {
    
    const dispatch = useDispatch();
    const [isNutritionistRole, setIsNutritionist] = useState(false);

    const isNutritionistRoleFunc = () => {
        // Some js
        return isNutritionistRole;
    }

    useEffect(() => {
        const userDetails = loadState();
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

    return(
        <div>
            <NavigationBar/>
            <Search/>
             {/*<RandomRecipes/>*/}
            < IngredientsSearch/>

            {isNutritionistRoleFunc() ?
             <MealByMe /> :
             <MealsBar/>
            }

        </div>
    )
}
export default HomeScreen;


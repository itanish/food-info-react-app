import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import MealByMe from "../MealByMe"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadState } from "../../service/user_service";


const HomeScreen = () => {
    
    const dispatch = useDispatch();

    const isNutritionist = () => {

        if (localStorage.length > 0) {
            if (JSON.parse(localStorage.getItem("loggedInUser")).role === "nutritionist") {
                return true;
            }
        }

      return false;

    }

    const isNutritionistRole = isNutritionist()

    useEffect(() => {
        const userDetails = loadState();
        // console.log(userDetails);
        if (userDetails !== undefined && userDetails !== null) {
            dispatch({
              type: "LOGIN_USER",
              user: userDetails,
            });
        }
    }, []);

    return(
        <div>
            <NavigationBar/>
            <Search/>
             {/*<RandomRecipes/>*/}
            < IngredientsSearch/>

            {isNutritionistRole ?
             <MealByMe /> :
             ""
            }

        </div>
    )
}
export default HomeScreen;


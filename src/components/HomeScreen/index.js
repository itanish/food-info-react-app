import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const HomeScreen = () => {
    
    const dispatch = useDispatch();

    const loadState = () => {
        try {
            const userDetails = localStorage.getItem("loggedInUser");
            return JSON.parse(userDetails);
        } catch {
            return undefined;
        }
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
    }, []);

    return(
        <div>
            <NavigationBar/>
            <Search/>
            {/*<RandomRecipes/>*/}
            <IngredientsSearch/>

        </div>
    )
}
export default HomeScreen;


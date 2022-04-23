import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadState } from "../../service/user_service";


const HomeScreen = () => {
    
    const dispatch = useDispatch();

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


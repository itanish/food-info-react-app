import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"
import { useSelector } from "react-redux";

const HomeScreen = () => {
    const users = useSelector(state => state.users);
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


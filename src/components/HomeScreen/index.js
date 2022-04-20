import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";
import IngredientsSearch from "../IngredientSearch"

const HomeScreen = () => {
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


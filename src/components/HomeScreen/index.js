import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import IngredientsSearch from "../IngredientSearch"

const HomeScreen = () => {
    return(
        <div>
            <Search/>
            {/*<RandomRecipes/>*/}
            <IngredientsSearch/>

        </div>
    )
}
export default HomeScreen;


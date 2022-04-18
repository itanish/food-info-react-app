import RandomRecipes from "../RandomRecipes";
import Search from "../Search";
import NavigationBar from "../NavigationBar";

const HomeScreen = () => {
    return(
        <div>
            <NavigationBar/>
            <Search/>
            <RandomRecipes/>
        </div>
    )
}
export default HomeScreen;


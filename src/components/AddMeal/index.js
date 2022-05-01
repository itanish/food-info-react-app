import './style.css'
import { addMeal } from '../../actions/user_actions'
import { useDispatch } from 'react-redux'
import Navigation from "../NavigationBar";

const AddMeal = () => {
    let meal = {}

    const dispatch = useDispatch();

    const registerUser = () => {
        let user = localStorage.getItem('user')
        meal.nutritionist = JSON.parse(user)._id;
        meal.nutritionist_name = JSON.parse(user).name;
        console.log(meal)
        addMeal(dispatch,meal);
        alert("Meal Added!");
    }

    const idOnChangeHandler = (name) => {
        meal.name = name;
    }

    const recipeOnChangeHandler = (recipe) => {
        let recipess = "[" + recipe + "]";
        recipess = JSON.parse(recipess)

        meal.recipe = recipess;
    }

    return(
        <>
        <Navigation/>

            <div className="jumbotron jumbotron-fluid jumbo-image-add-meal">
                <div className="container">
                    <h1 className="display-4 ht-centered">Create A New Meal</h1>
                    <p className="lead text-white ht-centered-sub">As a nutritionist, you can add a new meal with the meal name and the recipe ids of the recipes that you want to include in this meal.</p>
                </div>
            </div>
        <div className="form border rounded">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="name">Meal Name: </label>
                    <input className="form__input form-control" type="text" id="userId" placeholder="Meal Name" onChange={(event) => {
                    idOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="recipeIds">
                    <label className="form__label" for="recipeIds">Recipe Ids: </label>
                    <input  type="text" id="recipeIds" className="form__input form-control" placeholder="Recipe Ids (seperated by comma)" onChange={(event) => {
                    recipeOnChangeHandler(event.target.value);
                }}/>
                </div>

            </div>
            <div className="footer">
                <button onClick={() => registerUser()} type="button" class="btn btn-primary form-control">Add Meal Plan</button>
            </div>
        </div>
        </>
      )
}
export default AddMeal;
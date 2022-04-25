import './style.css'
import { addMeal } from '../../actions/user_actions'
import { useDispatch } from 'react-redux'

const AddMeal = () => {
    let meal = {}

    const dispatch = useDispatch();

    const registerUser = () => {
        let user = localStorage.getItem('loggedInUser')
        meal.nutritionist = JSON.parse(user)._id;
        meal.nutritionist_name = JSON.parse(user).name;
        console.log(meal)
        addMeal(dispatch,meal);
    }

    const idOnChangeHandler = (name) => {
        meal.name = name;
    }

    const recipeOnChangeHandler = (recipe) => {
        meal.recipe = recipe;
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="name">Meal Name: </label>
                    <input className="form__input" type="text" id="userId" placeholder="Meal Name" onChange={(event) => {
                    idOnChangeHandler(event.target.value);
                }}/>
                </div>
                <div className="recipeIds">
                    <label className="form__label" for="recipeIds">Recipe Ids: </label>
                    <input  type="text" id="recipeIds" className="form__input" placeholder="Recipe Ids (seperated by comma)" onChange={(event) => {
                    recipeOnChangeHandler(event.target.value);
                }}/>
                </div>

            </div>
            <div className="footer">
                <button onClick={() => registerUser()} type="button" class="btn btn-primary">Add Meal Plan</button>
            </div>
        </div>      
      )
}
export default AddMeal;
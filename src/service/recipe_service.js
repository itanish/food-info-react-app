import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const RECIPE_API = `${API_BASE}/recipe`;

export const saveUserForRecipe = async (recipe) => {
    console.log("recipe to be added ");
    console.log(recipe)
    const response = await axios.post(`${RECIPE_API}/addrecipe`, recipe)
    return response.data;
}
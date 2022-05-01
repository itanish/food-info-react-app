import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const RECIPE_API = `${API_BASE}/recipe`;

export const saveUserForRecipe = async (recipe) => {
    console.log("recipe to be added ");
    console.log(recipe)
    const response = await axios.post(`${RECIPE_API}/addrecipe`, recipe)
    return response.data;
}

export const deleteUserForRecipe = async (recipe,user) => {
    console.log("recipe to be deleted ");
    console.log(recipe)
    console.log("user to be deleted ");
    console.log(user)
    let data = {};
    data.recipe = recipe;
    data.user = user;
    //const response = await axios.put(`${RECIPE_API}/deleteuserforrecipe`, data)
    //return response.data;
}


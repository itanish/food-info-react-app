import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const INGREDIENT_API = `${API_BASE}/ingredient`;

export const saveUserForIngredient = async (ingred) => {
    console.log("ingred to be added ");
    console.log(ingred)
    const response = await axios.post(`${INGREDIENT_API}/addingredient`, ingred)
    return response.data;
}

export const deleteUserForRecipe = async (id,user) => {
    let data = {};
    data.ingredient = id;
    data.user = user;
    const response = await axios.put(`${INGREDIENT_API}/deleteuseringredient`, data)
    return response.data;
}
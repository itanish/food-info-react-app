import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const USER_API = `${API_BASE}/users`;
const MEAL_API = `${API_BASE}/meals`;
const RECIPE_API = '${API_BASE}/recipe';

export const getUserByEmail = async (email) => {
    console.log(`${USER_API}/${email}`)
    const response = await axios.get(`${USER_API}/${email}`)
    return response.data;
}

export const getUserById = async (uid) => {
  console.log(`${USER_API}/${uid}`);
  const response = await axios.get(`${USER_API}/${uid}`);
  return response.data;
};

export const getUserByName = async(name) => {
    const response = await axios.get(`${USER_API}/name/${name}`);
    return response.data;
}

export const updateUser = async (user) => {
    const response = await axios.put(`${USER_API}/${user._id}`, user)
    return response.data;
}

export const createUser = async (user) => {
    console.log("Service :",user)
    const response = await axios.post(`${USER_API}/createUser`, user)
    return response.data;
}

export const loginUser = async (loginUser) => {
    // console.log("Logging the user in", loginUser);
    const response = await axios.post(`${USER_API}/loginUser`, loginUser);
    return response.data;
}

export const addRecipe = async (user) => {
    
    const response = await axios.post(`${USER_API}/addRecipe`, user)
    return response.data;
}

export const addMeal = async (meal) => {
    
    const response = await axios.post(`${MEAL_API}/addMeal`, meal)
    return response.data;
}

export const loadState = () => {
  try {
    const userDetails = localStorage.getItem("user");
    return JSON.parse(userDetails);
  } catch {
    return undefined;
  }
}


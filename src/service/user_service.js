import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const USER_API = `${API_BASE}/users`;
const NUTRITIONIST_API = `${API_BASE}/nutritionist`;
const MEAL_API = `${API_BASE}/meals`;

const ADMIN_API = `${API_BASE}/admin`;


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

export const getNutriotionistsRequetsToApprove = async () => {
    const response = await axios.get(`${NUTRITIONIST_API}/reqeusts/`);
	return response.data;
}

export const approveNutritionistRequest = async (uid) => {
  const response = await axios.put(`${NUTRITIONIST_API}/reqeusts/approve/${uid}`);
  return response.data;
};

export const declineNutriotionistRequest = async (uid) => {
  const response = await axios.delete(
    `${NUTRITIONIST_API}/reqeusts/decline/${uid}`
  );
  return response.data;
};

export const getApprovedNutrionists = async () => {
  const response = await axios.get(`${NUTRITIONIST_API}`);
  return response.data;
};


export const updateUser = async (user) => {
    console.log("Update user"+user);
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

export const loginAdmin = async (loginUser) => {
  // console.log("Logging the user in", loginUser);
  const response = await axios.post(`${ADMIN_API}/loginUser`, loginUser);
  return response.data;
};

export const addRecipe = async (user) => {
    
    const response = await axios.post(`${USER_API}/addRecipe`, user)
    return response.data;
}

export const addUserMeal = async (user) => {
    const response = await axios.post(`${USER_API}/addUserMeal`, user)
    return response.data;
}

export const addIngredient = async (user) => {
  const response = await axios.post(`${USER_API}/adduseringredients`, user)
  return response.data;
}


export const addMeal = async (meal) => {
    
    const response = await axios.post(`${MEAL_API}/addMeal`, meal)
    return response.data;
}
export const getMeal = async (nutritionist) => {

    const response = await axios.post(`${MEAL_API}/addMeal${nutritionist}`,)
    return response.data;
}

export const getLoggedInUserDetails = () => {
  try {
    const userDetails = localStorage.getItem("user");
    return JSON.parse(userDetails);
  } catch {
    return undefined;
  }
}
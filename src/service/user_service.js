import axios from 'axios';

const API_BASE = "http://localhost:4000/api"
const USER_API = `${API_BASE}/users`;

export const getUserByEmail = async (email) => {
    console.log(`${USER_API}/${email}`)
    const response = await axios.get(`${USER_API}/${email}`)
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axios.get(`${USER_API}/${id}`)
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
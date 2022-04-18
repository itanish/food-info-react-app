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

export const updateUser = async (user, uid) => {
    const response = await axios.post(`${USER_API}/${uid}`, user)
    return response.data;
}
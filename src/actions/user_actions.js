import * as service from '../service/user_service.js';

export const CREATE_USER = 'CREATE_USER';
export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export const getUserById = async (dispatch, id) => {
    const userById = await service.getUserById(id);
    dispatch({
        type: 'USER_DETAILS',
        user : userById
    })
}

export const getUserByEmail = async (dispatch, email) => {
    const userByEmail = await service.getUserByEmail(email);
    console.log(userByEmail)
    dispatch({
         type: 'USER_DETAILS',
         user : userByEmail
     })
}

export const updateUser = async (dispatch, user, uid) => {
    const newUser = await service.updateUser(user, uid);
    dispatch({
        type: 'UPDATE_USER',
        user: newUser
    })
}
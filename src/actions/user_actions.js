import * as service from '../service/user_service.js';

export const CREATE_USER = 'CREATE_USER';
export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export const getUserByEmail = async (dispatch, email) => {
    const userByEmail = await service.getUserByEmail(email);
    console.log(userByEmail)
    dispatch({
         type: 'USER_DETAILS',
         user : userByEmail
     })
}

export const loginForAdmin = async (dispatch, adminUser) => {
    const loggedInAdmin = await service.loginAdmin(adminUser);
    localStorage.setItem("user", JSON.stringify(loggedInAdmin));
    dispatch({
      type: "LOGIN_USER",
      user: loggedInAdmin,
    });
};

export const updateUser = async (dispatch, user) => {
    const newUser = await service.updateUser(user);
    
    dispatch({
        type: 'UPDATE_USER',
        user: user
    })
    localStorage.setItem("user", JSON.stringify(user));
    
}

export const createUser = async (dispatch, user) => {
    const newUser = await service.createUser(user);
    dispatch({
        type: 'CREATE_USER',
        user: newUser
    })
}

export const saveRecipe = async (dispatch, user) => {
    const newUserRecipe = await service.addRecipe(user);
    dispatch({
        type: 'ADD_RECIPE',
        userRecipe: newUserRecipe
    })
}


export const loginUser = async (dispatch, loginUser) => {
    const loggedInUser = await service.loginUser(loginUser);
    if(loggedInUser!=="fail") {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
    dispatch({
        type: 'LOGIN_USER',
        user : loggedInUser
    })
}


export const addMeal = async (dispatch, meal) => {
    const meals = await service.addMeal(meal);
}

export const logoutUser = (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT_USER",
    });
}
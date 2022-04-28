import { useEffect } from "react";

const userReducer = (state = [], action) => {
    switch (action.type) {
      case "LOGIN_USER":
        state = action.user;
        //localStorage.setItem("user", JSON.stringify(state));
        return state;
      case "LOGOUT_USER":
        state = [];
        return state;
      case "UPDATE_USER":
        state = action.user;
        return state;
      case "CREATE_USER":
        return state;
      case 'ADD_RECIPE':
        state = action.user;
        return state;
      case 'ADD_MEAL':
        state = action.user;
        return state;
      case 'ADD_INGREDIENT':
        state = action.user;
        return state;
      default:
        return state;
    }
}

export default userReducer;

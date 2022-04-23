import { useEffect } from "react";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            state = action.user;
            return state;
        case 'UPDATE_USER':
            state = action.user;
            return state;
        case 'CREATE_USER':
            return state;
        case 'ADD_RECIPE':
            state = action.user;
            return state;
        default:
            return state;
    }

    
}

export default userReducer;

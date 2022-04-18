const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'USER_DETAILS':
            state = action.user;
            return state;
        case 'UPDATE_USER':
            state = action.user;
            return state;
        default:
            return state;
    }
}

export default userReducer;

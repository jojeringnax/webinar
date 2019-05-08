const initialState = {
    isLogged: false,
    user: {
        auth_token: ''
    }

};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH" :
            return {
                isLogged: action.isLogged,
                user: action.user
            };
        default:
            return state
    }
};
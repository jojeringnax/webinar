import {ADD_COMMENT} from "../actions/ActionType";

export const comments = (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                text: action.comment,
                userName: action.userName,
                userTime: action.userTime
            }
        default:
            return state
    }
};
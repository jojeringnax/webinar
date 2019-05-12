import {ADD_BACKLINK} from "../actions/ActionType";

export const back = (state = [], action) => {
    switch (action.type) {
        case ADD_BACKLINK:
            return {
                link: action.link
            };
        default:
            return state
    }
};
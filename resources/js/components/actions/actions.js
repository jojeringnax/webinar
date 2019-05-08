import {ADD_COMMENT} from "./ActionType";

export const addCommnet = (comment, userName, userTime) => ({
    type: ADD_COMMENT,
    comment,userName, userTime

});
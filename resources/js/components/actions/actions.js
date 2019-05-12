import {ADD_COMMENT, ADD_BACKLINK} from "./ActionType";

export const addCommnet = (comment, userName, userTime) => ({
    type: ADD_COMMENT,
    comment,userName, userTime
});

export const setAuth = (isLogged, user) => ({
    type: "SET_AUTH",
    isLogged, user
});

export const setBackLink = (link) => ({
    type: ADD_BACKLINK,
    link
});
import { combineReducers } from 'redux';
import {comments} from "./addComment";
import {auth} from './auth';


export default combineReducers({
    comments,
    auth
});
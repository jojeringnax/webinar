import { combineReducers } from 'redux';
import {comments} from "./addComment";
import {auth} from './auth';

import {back} from './addBackLink'


export default combineReducers({
    comments,
    auth,
    back
});
import axios from "axios";
import React from "react";
import {store} from "./components/Root";

export const handleLol = () => {
    axios.get('/api/video/1/comments?token=' + this.state.user.auth_token)
        .then(res => {
            this.setState({comments: res.data})
        });
};

export const renderComments = (obj, level=0) => {
    if(obj === []){
        return false;
    }
    let result = [];
    result.push(<div key={obj.comment.id} className='parent'>{obj.comment.content} = {obj.comment.id}</div> );
    if (obj.hasOwnProperty('children')) {
        level++;
        Object.keys(obj.children).map(key => {
            result.push(<div key={obj.children[key].comment.id} style={{paddingLeft: level*20}}><span>{'Ответ на коммент №'+obj.comment.id}</span>{renderComments(obj.children[key], level)}</div>);
        });
    }
    return result;
};

export const adminAxios = (url, settings={}, method='get') => {
  return  axios[method](url + "?token=" + store.getState().auth.user.auth_token, settings);
};

import axios from "axios";
import React from "react";

export const handleLol = () => {
    axios.get('/api/video/1/comments?token=' + this.state.user.auth_token)
        .then(res => {
            this.setState({comments: res.data})
        });
};

export const renderComments = (obj, level=0) => {
    let result = [];
    result.push(<div key={obj.comment.id} className='parent'>{obj.comment.content} = {obj.comment.id}</div> );
    if (obj.hasOwnProperty('children')) {
        level++;
        Object.keys(obj.children).map(key => {
            result.push(<div style={{paddingLeft: level*20}}><span>{'Ответ на коммент №'+obj.comment.id}</span>{this.renderComments(obj.children[key], level)}</div>);
        });
    }
    return result;
};

export const adminAxios = (url, cookies, settings) => {
  return  axios.get(url + "?token=" + cookies.get('user').auth_token, settings);
};
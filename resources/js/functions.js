import axios from "axios";
import React from "react";
import {store} from "./components/Root";
import { IoMdPerson, IoIosRedo, IoIosEyeOff } from "react-icons/io";
import { MdEdit, MdDelete, MdBlock, MdCheckBox } from "react-icons/md";

export const handleLol = () => {
    axios.get('/api/video/1/comments?token=' + this.state.user.auth_token)
        .then(res => {
            this.setState({comments: res.data})
        });
};
const statuses = {
    0: 'pending',
    1: 'active',
    2: 'hidden',
    3: 'deleted'
};
export const renderComments = (obj, level=0) => {
    if(obj === []){
        return false;
    }
    let result = [];
    result.push(
        <div key={obj.comment.id} className={statuses[obj.comment.status] + ' parent comment-parent__admin d-flex justify-content-start align-items-start'}>
            <div className="user-avatar-comment__admin item-comment__admin">
                <IoMdPerson />
            </div>
            <div className="d-flex flex-column data-comment__admin">
                <div className="name-user__admin d-flex justify-content-start item-comment__admin">
                    <span> <span>id: {obj.comment.id}</span> : {obj.comment.name}</span>
                    <div className="data-comment__admin">{obj.comment.created_at}</div>
                </div>
                <div className="comment-content__admin item-comment__admin">
                    {obj.comment.content}
                </div>
            </div>
            <div className="action-comment__admin d-flex align-items-center flex-row justify-content-center">
                <div className="icon-action__admin">
                    <MdCheckBox />
                </div>
                <div className="icon-action__admin">
                    <MdEdit />
                </div>
                <div className="icon-action__admin">
                    <IoIosEyeOff />
                </div>
                {/*<div className="icon-action__admin">*/}
                {/*    <MdBlock />*/}
                {/*</div>*/}
                <div className="icon-action__admin">
                    <MdDelete />
                </div>
            </div>
        </div> );
    if (obj.hasOwnProperty('children')) {
        level++;
        Object.keys(obj.children).map(key => {
            result.push(<div key={obj.children[key].comment.id} style={{paddingLeft: level*30}}><IoIosRedo />{renderComments(obj.children[key], level)}</div>);
        });
    }
    return result;
};

export const adminAxios = (url, settings={}, method='get') => {
  return  axios[method](url + "?token=" + store.getState().auth.user.auth_token, settings);
};

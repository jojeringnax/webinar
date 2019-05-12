import axios from "axios";
import React from "react";
import {store} from "./components/Root";
import { IoMdPerson, IoIosRedo, IoIosEyeOff, IoIosEye } from "react-icons/io";
import { MdEdit, MdDelete, MdBlock, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import CommentForm from './components/Webinar/Comments/CommentForm';

export const handleLol = () => {
    axios.get('/api/video/1/comments?token=' + this.state.user.auth_token)
        .then(res => {
            this.setState({comments: res.data})
        });
};
export const statuses = {
    0: 'pending',
    1: 'active',
    2: 'hidden',
    3: 'deleted'
};

export const renderCommentsOnAdminPage = (obj, level=0) => {
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
                    <a href="" onClick={""}><MdCheckBoxOutlineBlank /></a>
                </div>
                <div className="icon-action__admin">
                    <a href="" onClick={""}><MdEdit /></a>
                </div>
                <div className="icon-action__admin">
                    <a href="" onClick={""}><IoIosEyeOff /></a>
                </div>
                {/*<div className="icon-action__admin">*/}
                {/*    <MdBlock />*/}
                {/*</div>*/}
                <div className="icon-action__admin">
                    <a href="" onClick={""}><MdDelete /></a>
                </div>
            </div>
        </div> );

        level++;
        Object.keys(obj.children).map(key => {
            result.push(<div key={obj.children[key].comment.id} style={{paddingLeft: level*30}}> <div className="d-flex"><IoIosRedo />{obj.comment.id}</div>{renderCommentsOnAdminPage(obj.children[key], level)}</div>);
        });
    return result;
};

export const  hideOnClickOutside = (element, selector) => {
    const outsideClickListener = event => {
        if (event.target.closest(selector) === null) {
            element.classList.add('hide');
            removeClickListener()
        }
    };
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    };

    document.addEventListener('click', outsideClickListener)
};

const ChangeReply = (e) => {
    e.preventDefault();
    let targetA = e.target;
    document.querySelectorAll('.form-reply').forEach(element => {
        element.classList.add('hide');
    });
    document.getElementById('parent_comment_' + targetA.getAttribute('data-parent_id')).classList.remove('hide');
    let form = document.querySelector('#parent_comment_' + targetA.getAttribute('data-parent_id'));
    hideOnClickOutside(form, '#parent_comment_' + targetA.getAttribute('data-parent_id'))

};

export const renderCommentsOnMainPage = (obj, level=0) => {
    if (obj === []) {
        return false;
    }
    if([0,2,3].includes(parseInt(obj.comment.status))){
        return false;
    }

    let result = [];
    result.push(
        <div key={obj.comment.id} className={statuses[obj.comment.status] + ' d-flex justify-content-start align-items-start reg-comment comment flex-column'} >
            <div className="comments-user d-flex" >
                {/*<div className="comments-user__avatar">*/}
                {/*    <IoMdPerson />*/}
                {/*</div>*/}
                <div className="comments-user__name d-flex flex-column">
                    <span>{obj.comment.name ? obj.comment.name : 'Тут должно быть имя пользователя'}</span>
                    <div className="comments-user__time">
                        {obj.comment.created_at ? obj.comment.created_at : 'Тут должно быть время комментария!!!'}
                    </div>
                </div>
            </div>
            <div className="comments__text">
                {obj.comment.content ? obj.comment.content : 'Тут должен быть текст комментария. Желательно, очень хороший!!!'}
            </div>
            <div className="comments__action active">
                <div className="reply">
                    <a className="button-reply" data-parent_id={obj.comment.id} href="#" onClick={ChangeReply}>Ответить</a>
                </div>
            </div>
            <CommentForm hide={true} parend_id={obj.comment.id}/>
        </div>
    );

    level++;
    Object.keys(obj.children).map(key => {
            result.push(
                <div key={obj.children[key].comment.id} style={{paddingLeft: level*30}}>
                    {/*<div className="d-flex align-items-center">*/}
                    {/*    <IoIosRedo />*/}
                    {/*    <span style={{marginLeft:"15px"}}>{obj.comment.name}</span>*/}
                    {/*</div>*/}
                    {renderCommentsOnMainPage(obj.children[key], level)}
                </div>
            );
    });
    return result;
};

export const adminAxios = (url, settings={}, method='get') => {
  return  axios[method](url + "?token=" + store.getState().auth.user.auth_token, settings);
};

import axios from "axios";
import React from "react";
import {store} from "./components/Root";

export const statuses = {
    0: 'pending__admin',
    1: 'active__admin',
    2: 'hidden__admin',
    3: 'deleted__admin'
};

export const statusesMainPage = {
    0: 'pending',
    1: 'active',
    2: 'hidden',
    3: 'deleted'
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

export const ChangeReply = (e) => {
    e.preventDefault();
    let targetA = e.target;
    document.querySelectorAll('.form-reply').forEach(element => {
        element.classList.add('hide');
    });
    document.getElementById('parent_comment_' + targetA.getAttribute('data-parent_id')).classList.remove('hide');
    let form = document.querySelector('#parent_comment_' + targetA.getAttribute('data-parent_id'));
    hideOnClickOutside(form, '#parent_comment_' + targetA.getAttribute('data-parent_id'))

};

export const adminAxios = (url, settings={}, method='get') => {
  return  axios[method](url + "?token=" + store.getState().auth.user.auth_token, settings);
};

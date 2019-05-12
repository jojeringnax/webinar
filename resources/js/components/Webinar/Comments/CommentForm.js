import React from 'react';

import {adminAxios} from "../../../functions";

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            commentText: "",
            name: "Влад",
            avatar:""
        };
    }

    changeInput = (e) => {

        this.setState({
            commentText: e.target.value
        })
    };

    submitComment = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        adminAxios('/api/comment/create', formData, 'post');
        if(e.target.parentElement.classList.contains('form-reply')){
            e.target.parentElement.classList.add('hide');
        }
    };

    render() {
        return (
            <div id={"parent_comment_" + this.props.parend_id} className={this.props.hide ? "hide form-reply" : "" + "form-group form__comment"}>
                <form className="addComment" onSubmit={this.submitComment}>
                    {/*<label htmlFor="formComment">Ваш комментарий</label>*/}
                    <input name="name" type="hidden" defaultValue="Влад Ким"/>
                    <textarea
                        name="content"
                        id="formComment"
                        value={this.state.commentText}
                        onChange={this.changeInput}
                        placeholder="Введите комментарий"
                    />
                    <input name="parent_id" defaultValue={this.props.parend_id} type="hidden"/>
                    <button type="submit" className="btn-outline-success">ОТПРАВИТЬ</button>
                </form>
            </div>
        );
    }
}
export default CommentForm;
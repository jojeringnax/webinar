import React from 'react';

import {adminAxios} from "../../../functions";

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            commentText: "",
            name: this.props.cookies.get('name'),
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
        this.props.cookies.set('name', this.state.name);
        let formData = new FormData(e.target);
        adminAxios('/api/comment/create', formData, 'post');
        if(e.target.parentElement.classList.contains('form-reply')){
            e.target.parentElement.classList.add('hide');
        }
    };
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }
    }

    render() {
        return (
            <div id={"parent_comment_" + this.props.parend_id} className={this.props.hide ? "hide form-reply" : "" + "form-group form__comment"}>
                <form className="addComment" onSubmit={this.submitComment}>
                    <input className="name-webinar" onChange={this.handleNameChange} name="name" value={this.state.name} type="text"/>
                    <textarea
                        name="content"
                        id="formComment"
                        value={this.state.commentText}
                        onChange={this.changeInput}
                        placeholder="Введите комментарий"
                    />
                    <input name="video_id" defaultValue={this.props.video_id} type="hidden"/>
                    <input name="parent_id" defaultValue={this.props.parend_id} type="hidden"/>
                    <button type="submit" className="btn-outline-success">ОТПРАВИТЬ</button>
                </form>
            </div>
        );
    }
}
export default CommentForm;
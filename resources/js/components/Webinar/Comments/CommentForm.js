import React from 'react';
import {store} from "../../Root";
import {addCommnet} from "../../actions/actions";
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

    };
    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.submitComment}>
                    <label htmlFor="formComment">Ваш комментарий</label>
                    <input name="name" type="text" defaultValue="asdasd"/>
                    <textarea
                        name="content"
                        className="form-control"
                        id="formComment"
                        value={this.state.commentText}
                        onChange={this.changeInput}
                    />
                    <button type="submit" className="btn-outline-success">Отправить комментарий</button>
                </form>
            </div>
        );
    }
}
export default CommentForm;
import React from 'react';
import {store} from "../../Root";
import {addCommnet} from "../../actions/actions";

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            commentText: "",
            name: "",
            time: "",
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
        store.dispatch(addCommnet(this.state.commentText, "Иван", "11.02.1994"))

    };
    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.submitComment}>
                    <label htmlFor="formComment">Ваш комментарий</label>
                    <textarea
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
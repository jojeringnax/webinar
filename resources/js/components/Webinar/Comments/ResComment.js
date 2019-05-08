import React from 'react';

class ResComment extends React.Component{
    render() {
        return (
                <div className="res-comment comment">
                    <div className="comments-user" >
                        <div className="comments-user__avatar">
                            <img src={this.props.userAvatar ? this.props.userAvatar : ''} alt={this.props.userAvatar ? this.props.userAvatar : 'Аватар'}/>
                        </div>
                        <div className="comments-user__name">
                            {this.props.userName ? this.props.userName : 'Тут должно быть имя пользователя'}
                        </div>
                        <div className="comments-user__time">
                            {this.props.commentTime ? this.props.commentTime : 'Тут должно быть время комментария!!!'}
                        </div>
                    </div>
                    <div className="comments__text">
                        {this.props.commnetText ? this.props.commnetText : 'Тут должен быть текст комментария. Желательно, очень хороший!!!'}
                    </div>
                    <div className="comments__action active">
                        <div className="reply">
                            <span onClick={this.submitComment}>Ответить</span>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ResComment;
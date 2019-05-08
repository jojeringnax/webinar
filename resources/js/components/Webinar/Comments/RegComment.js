import React from 'react';

class RegComment extends React.Component{
    render() {
        return (
            <div className="reg-comment comment">
                <div className="comments-user d-flex" >
                    <div className="comments-user__avatar">
                        <img src={this.props.userAvatar ? this.props.userAvatar : ''} alt={this.props.userAvatar ? this.props.userAvatar : 'Аватар'}/>
                    </div>
                    <div className="comments-user__name d-flex flex-column">
                        <span>{this.props.userName ? this.props.userName : 'Тут должно быть имя пользователя'}</span>
                        <div className="comments-user__time">
                            {this.props.commentTime ? this.props.commentTime : 'Тут должно быть время комментария!!!'}
                        </div>
                    </div>

                </div>
                <div className="comments__text">
                    {this.props.commnetText ? this.props.commnetText : 'Тут должен быть текст комментария. Желательно, очень хороший!!!'}
                </div>
                <div className="comments__action active">
                    <div className="reply">
                        <span>Ответить</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegComment;
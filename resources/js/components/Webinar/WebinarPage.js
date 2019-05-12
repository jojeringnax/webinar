import React from 'react';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Echo from 'laravel-echo';
import {adminAxios, statusesMainPage, ChangeReply} from "../../functions";
import {setCommentsArray} from "../../helpers/helpers";
import CommentForm from './Comments/CommentForm';
import VideoOfWebinar from './VideoOfWebinar';
import AuthNameUser from './AuthNameUser';


class WebinarPage extends React.Component{
    constructor(props){
        super(props);
        window.io = require('socket.io-client');
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':6001'
        });
        this.state = {
            comments: [],
            video: {},
            name:'',
            displayModWeb: true
        };
    }

    renderCommentsOnMainPage = (obj, level=0) => {
        if (obj === []) {
            return false;
        }
        if([0,2,3].includes(parseInt(obj.comment.status))){
            return false;
        }

        let result = [];
        result.push(
            <div key={obj.comment.id} className={statusesMainPage[obj.comment.status] + ' d-flex justify-content-start align-items-start reg-comment comment flex-column'} >
                <div className="comments-user d-flex" >
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
                <CommentForm cookies={this.props.cookies} video_id={this.props.match.params.id} name={this.state.name} hide={true} parend_id={obj.comment.id}/>
            </div>
        );

        level++;
        Object.keys(obj.children).map(key => {
            result.push(
                <div key={obj.children[key].comment.id} style={{paddingLeft: level*30}}>
                    {this.renderCommentsOnMainPage(obj.children[key], level)}
                </div>
            );
        });
        return result;
    };

    componentDidMount() {
        adminAxios('/api/video/'+ this.props.match.params.id)
            .then(res => {
                this.setState({
                    video: res.data
                })
            });
        adminAxios('/api/video/'+ this.props.match.params.id + '/comments')
            .then(res => {
                this.setState({
                    comments: res.data
                });
                window.Echo.channel('newComment')
                    .listen('NewCommentNotification', (e) => {
                        let comments = this.state.comments;
                        comments.forEach((el, index) => {
                            if(el.id === e.id) {
                                delete comments[index];
                            }
                        });
                        comments.push(e);
                        comments.sort((a,b) => {
                            return a.created_at.localeCompare(b.created_at)
                        });
                        this.setState({
                            comments: comments
                        });
                    });
            });
    }


    authName = (name) => {
        this.setState({
            name: name,
            displayModWeb: false
        })
    };


    render() {
        const allComments = setCommentsArray(this.state.comments);

        return (
            <div style={{position:'relative'}}>
                <div className={(this.props.cookies.get('name')) ? 'hide' : "overlay"}></div>
                <div className={(this.props.cookies.get('name')) ? 'hide' : "wrapper__mod-wen"}>
                    <AuthNameUser cookies={this.props.cookies} sendName={this.authName} />
                </div>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8" lg="8" md="8">
                            <VideoOfWebinar video={this.state.video}/>
                        </MDBCol>
                        <MDBCol xl="4" lg="4" md="4">
                            <div className="total-comments d-flex align-items-center"><h3>Комментарии</h3> <span className="number-comments">{this.state.comments.length}</span></div>
                            <CommentForm cookies={this.props.cookies} video_id={this.props.match.params.id} name={this.state.name}/>
                            {allComments.map(comment => {
                                return this.renderCommentsOnMainPage(comment);
                            })}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default WebinarPage;
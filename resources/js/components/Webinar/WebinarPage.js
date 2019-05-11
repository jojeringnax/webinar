import React from 'react';
import AllWebinarsForUser from './AllWebinarsForUser';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Echo from 'laravel-echo';
import {adminAxios, renderCommentsOnMainPage} from "../../functions";
import {setCommentsArray} from "../../helpers/helpers";
import CommentForm from './Comments/CommentForm';
import VideoOfWebinar from './VideoOfWebinar';

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
            video: {}
        };
    }

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
                        //console.log(e);
                        this.setState({
                            comments: comments
                        });
                    });
            });

    }


    render() {
        const allComments = setCommentsArray(this.state.comments);

        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8" lg="8" md="8">
                            <VideoOfWebinar video={this.state.video}/>
                        </MDBCol>
                        <MDBCol xl="4" lg="4" md="4">
                            <div className="total-comments d-flex align-items-center"><h3>Комментарии</h3> <span className="number-comments">{this.state.comments.length}</span></div>
                            <CommentForm />
                            {allComments.map(comment => {
                                return renderCommentsOnMainPage(comment);
                            })}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default WebinarPage;
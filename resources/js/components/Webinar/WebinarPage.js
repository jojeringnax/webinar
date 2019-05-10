import React from 'react';
import Webinar from './Webinar';
import Comments from '../containers/Commnets';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Echo from 'laravel-echo';
import {adminAxios} from "../../functions";


class WebinarPage extends React.Component{
    constructor(props){
        super(props);
        window.io = require('socket.io-client');
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':6001'
        });
        this.state = {
            comments: []
        };


    }

    componentDidMount() {
        adminAxios('/api/comments')
            .then(res => {
                this.setState({
                    comments: res.data
                });
                window.Echo.channel('newComment')
                    .listen('NewCommentNotification', (e) => {
                        let comments = this.state.comments;
                        comments.push(e);
                        this.setState({
                            comments: comments
                        });
                    });
            });

    }

    render() {
        return (
            <div>
                {/*<MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8" lg="8" md="8">
                            <Webinar />
                        </MDBCol>
                        <MDBCol xl="4" lg="4" md="4">
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>*/}

                <Comments />
                {
                    this.state.comments.map( comment => {
                        return <div key={comment.id}>{comment.content} =  {comment.name}</div>
                    })
                }
            </div>
        );
    }
}

export default WebinarPage;
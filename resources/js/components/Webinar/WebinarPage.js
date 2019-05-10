import React from 'react';
import Webinar from './Webinar';
import Comments from '../containers/Commnets';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Echo from 'laravel-echo';


class WebinarPage extends React.Component{
    constructor(props){
        window.io = require('socket.io-client');
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':6001'
        });

        window.Echo.channel('newComment')
            .listen('NewCommentNotification', (e) => {
                console.log(e);
            });
        super(props);
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8" lg="8" md="8">
                            <Webinar />
                        </MDBCol>
                        <MDBCol xl="4" lg="4" md="4">
                            <Comments />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default WebinarPage;
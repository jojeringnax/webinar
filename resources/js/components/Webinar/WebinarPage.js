import React from 'react';
import Webinar from './Webinar';
import Comments from '../containers/Commnets';

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class WebinarPage extends React.Component{
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
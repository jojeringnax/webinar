import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Webinar extends React.Component{
    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8" lg="8" md="8">
                            Webinar
                        </MDBCol>
                        <MDBCol xl="4" lg="4" md="4">
                            Comments
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Webinar;
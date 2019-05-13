import React from 'react';
import {adminAxios} from "../../functions";
import {Link} from "react-router-dom";

class AllWebinarsForUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        adminAxios('/api/videos')
            .then(res => {
                this.setState({
                    videos: res.data
                },()=> {
                    console.log(this.state.videos)
                })
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center" >

                    <div className="card" style={{width:"100%", marginTop:"75px", height: "100%"}}>
                        <div className="card-head">
                            <h1 className="text-center">Webinars</h1>
                        </div>
                        <div  className="d-flex col-12">
                            <div className=" card-body d-flex flex-row justify-content-around">
                                <div className="item-webinar-tr id-video col-1">
                                   ID
                                </div>
                                <div className="item-webinar-tr title-video col-2">
                                    TITLE
                                </div>
                                <div className="item-webinar-tr description-video col-3">
                                    DESCRIPTION
                                </div>
                                <div className="item-webinar-tr date-video col-2">
                                    DATE
                                </div>
                                <div className="item-webinar-tr status-video col-2">
                                    STATUS
                                </div>
                                <div className="item-webinar-tr title-video col-2">
                                    LINK TO WEBINAR
                                </div>
                            </div>
                        </div>
                        {
                            this.state.videos.map(video => {
                                return(
                                    <div key={video.id} className="d-flex col-12">
                                        <div className="card-body d-flex flex-row justify-content-around">
                                            <div className="item-webinar-td  d-video col-1">
                                                {video.id}
                                            </div>
                                            <div className="item-webinar-td title-video col-2">
                                                {video.title}
                                            </div>
                                            <div className="item-webinar-td description-video col-3">
                                                {video.description}
                                            </div>
                                            <div className="item-webinar-td date-video col-2">
                                                {video.date}
                                            </div>
                                            <div className="item-webinar-td status-video col-2">
                                                {video.status}
                                            </div>
                                            <div className="item-webinar-td title-video col-2">
                                                <a href={"/webinar/"+ video.id}>Посмотреть webinar</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default AllWebinarsForUser;
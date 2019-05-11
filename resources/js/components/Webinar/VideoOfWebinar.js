import React from 'react';

class VideoOfWebinar extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="video">
                <h1 className="title">{this.props.video.title}</h1>
                    <div className="video__webinar__main">
                        <div className="video__frame" dangerouslySetInnerHTML={{__html: this.props.video.link}} />
                        <div className="video__time d-flex justify-content-end">
                            <span className="video__time__title">Вебинар начнется:</span>
                            <span className="video__time__time"> {this.props.video.date}</span>
                        </div>
                        <div className="video__description">
                            <h2>Описание: {this.props.video.description}</h2>
                        </div>

                    </div>
            </div>
        );
    }
}

export default VideoOfWebinar;
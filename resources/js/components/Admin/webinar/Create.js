import React from 'react';
import {adminAxios} from "../../../functions";
import ReactHtmlParser from 'react-html-parser';

class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            date: '',
            notVideoChecked: true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let  formData = new FormData(form);
        adminAxios('/api/video/create', formData, 'post')
            .then(res => {

            })

    };

    handleChange = (e) => {
        this.setState({
            notVideoChecked: true,
            [e.target.name]: e.target.value
        })
    };

    showVideo = () => {
        let obj = {};
        obj.src += "?&autoplay=1";
        obj.width = "100%";
        obj.height = "100%";
        var str2DOMElement = function(html) {
            var frame = document.createElement('iframe');
            frame.style.display = 'none';
            document.body.appendChild(frame);
            frame.contentDocument.open();
            frame.contentDocument.write(html);
            frame.contentDocument.close();
            var el = frame.contentDocument.body.firstChild;
            document.body.removeChild(frame);
            return el;
        };

        let html =str2DOMElement(this.state.link);
        html.width = "100%";
        html.height = "100%";
        if (html.src.indexOf("autoplay=1") === -1){
            html.src += "?&autoplay=1";
        }
        this.setState({
            link: html.outerHTML,
            notVideoChecked: false
        });

        return html.outerHTML;
    };

    render() {
        return (
            <div className="ilia-pidor container">
                <div className="row d-flex">
                    <div className="form col-5">
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <input
                                className="form-control"
                                placeholder="Введите название вебинара"
                                onChange={this.handleChange}
                                value={this.state.title}
                                name="title"
                                type="text"
                            />
                            <input
                                className="form-control"
                                placeholder="Введите ссылку на вебинар"
                                onChange={this.handleChange}
                                value={this.state.link}
                                name="link"
                                type="text"
                            />
                            <input
                                className="form-control"
                                placeholder="Введите дату проведения мероприятия"
                                onChange={this.handleChange}
                                value={this.state.date}
                                name="date"
                                type="datetime-local" />
                            <button className="btn btn-outline-secondary" type="submit" disabled={this.state.notVideoChecked}>Создать вебинар</button>
                        </form>
                    </div>
                    <div className="col-7">
                        <button onClick={this.showVideo} className="btn btn-outline-danger">ПРОВЕРИТЬ</button>
                        <div className={(this.state.notVideoChecked ? 'hide ': '' )+  "video__frame__form"} dangerouslySetInnerHTML={{__html: this.state.link}} />
                    </div>
                </div>

            </div>

        );
    }
}
export default Create;
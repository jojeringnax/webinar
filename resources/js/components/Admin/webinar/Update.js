import React from 'react';
import {adminAxios, renderComments} from "../../../functions";

class Update extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            video: {
                title: '',
                link: '',
                date: ''
            },
            comments: []

        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentDidMount() {
        adminAxios('/api/video/'+this.props.match.params.id)
            .then(res => {
                res.data.date = res.data.date.replace(' ', 'T');
                this.setState({
                    video: res.data
                });
                adminAxios('/api/video/'+res.data.id + '/comments')
                    .then(res => {
                        this.setState({
                            comments: res.data
                        },() => {
                            console.log(this.state.comments)
                        })
                    })
            })

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="form-group col-xl-8" onSubmit={this.handleSubmit}>
                        <input className="form-control" placeholder="Введите название вебинара" onChange={this.handleChange} value={this.state.video.title} name="title" type="text" />
                        <input className="form-control" placeholder="Введите ссылку на вебинар" onChange={this.handleChange} value={this.state.video.link} name="link" type="text" />
                        <input className="form-control" placeholder="Введите дату проведения мероприятия" onChange={this.handleChange} value={this.state.video.date} name="date" type="datetime-local" />
                        <button className="btn btn-outline-secondary" type="submit">Создать вебинар</button>
                    </form>
                    <div id={this.state.id} className="comments">
                        {this.state.comments.map(comment => {
                            renderComments(comment)
                        })}
                    </div>
                </div>
            </div>

        );
    }
}

export default Update;
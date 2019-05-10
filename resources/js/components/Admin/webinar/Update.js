import React from 'react';
import {adminAxios, renderComments} from "../../../functions";
import Echo from 'laravel-echo';



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

    handleData = (data) => {
        let result = JSON.parse(data);
        console.log(result);
    };



    componentDidMount() {
        adminAxios('/api/video/'+this.props.match.params.id)
            .then(res => {
                //res.data.date = res.data.date.replace(' ', 'T');
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
            <div className="update" style={{width: "100%"}}>
                <div className="form-admin container-content-admin flex-column">
                    <h1 className="text-center" style={{marginBottom:"25px"}}>Страница обновления вебинара</h1>
                    <form className="form-group col-xl-8" onSubmit={this.handleSubmit}>
                        <label className="d-flex align-items-center" htmlFor="name">
                            <span className="text-label__admin">Название вебинара</span>
                            <input
                                className="admin-input-item form-control"
                                placeholder="Введите название вебинара"
                                onChange={this.handleChange} value={this.state.video.title}
                                name="title"
                                type="text"
                                id="name"
                            />
                        </label>
                        <label className="d-flex align-items-center" htmlFor="name">
                            <span className="text-label__admin">Ссылка на вебинара</span>
                            <input
                                className="admin-input-item form-control"
                                placeholder="Введите ссылку на вебинар"
                                onChange={this.handleChange}
                                value={this.state.video.link}
                                name="link"
                                type="text"
                            />
                        </label>
                        <label className="d-flex align-items-center" htmlFor="name">
                            <span className="text-label__admin">Дата проведения</span>
                                <input
                                    className="admin-input-item form-control"
                                    placeholder="Введите дату проведения мероприятия"
                                    onChange={this.handleChange}
                                    value={'12'}
                                    name="date" type="datetime-local"
                                />
                        </label>
                        <label className="d-flex align-items-center" htmlFor="name">
                            <span className="text-label__admin">Описание вебинара</span>
                            <textarea
                                className="admin-input-item form-control"
                                placeholder="Введите описание вебинара"
                                name="description"
                            />
                        </label>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-secondary align-self-center" type="submit">Создать вебинар</button>
                        </div>

                    </form>
                </div>

                <div id={this.state.id} className="comments-admin container-content-admin flex-column">
                    <h1 className="text-center">Комментарии</h1>
                    <div className="comments-block__admin">
                        {this.state.comments.map(comment => {
                            return renderComments(comment)
                        })}
                    </div>

                </div>
            </div>
        );
    }
}

export default Update;
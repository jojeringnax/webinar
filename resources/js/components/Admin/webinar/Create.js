import React from 'react';
import {adminAxios} from "../../../functions";

class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            date: ''
        }
    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let  formData = new FormData(form);
        adminAxios('/api/video/create', formData, 'post')
            .then(res => {
                console.log(res.data);
            })

    };

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
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
                <button className="btn btn-outline-secondary" type="submit">Создать вебинар</button>
            </form>
        );
    }
}
export default Create;
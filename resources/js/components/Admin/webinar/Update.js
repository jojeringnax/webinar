import React from 'react';
import {adminAxios, statuses} from "../../../functions";
import {setCommentsArray} from "../../../helpers/helpers";
import { IoMdPerson, IoIosRedo, IoIosEyeOff, IoIosEye } from "react-icons/io";
import { MdEdit, MdDelete, MdBlock, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";

class Update extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            video: {
                title: '',
                link: '',
                date: '',
                description:''
            },
            comments: [],
            commentsContent: {}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let  formData = new FormData(form);
        adminAxios('/api/video/'+ this.props.match.params.id + '/update', formData, 'post')
            .then(res => {
            })

    };

    handleChange = (e) => {
        this.setState({
            video: {
                ...this.state.video,
                [e.target.name]: e.target.value
            }

        })
    };

    handleChangeStatusComment = (e) => {
        adminAxios('/api/comment/'+ e.currentTarget.getAttribute('data-comment_id') + '/update', {status: e.currentTarget.getAttribute('data-status')}, 'post')
            .then(res => {

                let comments = this.state.comments;
                comments.forEach(el => {
                    if(el.id === res.data.id) {
                        el.status = res.data.status
                    }
                });

                this.setState({
                    comments: comments
                })


            })

    };
    handleTextArea = (e) => {
        this.setState({
            commentsContent: {
                ...this.state.commentsContent,
                [e.target.getAttribute('data-id')] : e.target.value
            }
        })
    };

    updateContentComment = (e) => {
        e.preventDefault();
        let idComment = e.target.getAttribute('data-id');
        let textArea = document.getElementById('content-comment-' + idComment);
        const btnChangeContent = e.target;
        adminAxios('/api/comment/' + idComment + '/update', {content: textArea.value}, "post")
            .then(res => {
                btnChangeContent.style.display = "none";
                alert('Content is updated');
            })
            .catch(err => {
                console.log(err)
            })
    };

    editContentComment =(e) => {
        let currentTextArea = document.getElementById("content-comment-" + e.currentTarget.getAttribute('data-comment_id'));
        const btnChangeContent = document.getElementById("btn-change-comment-" + e.currentTarget.getAttribute('data-comment_id'));
        currentTextArea.addEventListener("blur", function() {
            currentTextArea.setAttribute("disabled", "true");
            btnChangeContent.style.display = "none"
        }, true);

        currentTextArea.removeAttribute("disabled");
        btnChangeContent.style.display = "block"

    };


    renderCommentsOnAdminPage = (obj, level=0) => {
        if(obj === []){
            return false;
        }
        let result = [];

        result.push(
            <div key={obj.comment.id} className={statuses[obj.comment.status] + ' parent comment-parent__admin d-flex justify-content-start align-items-start'}>
                <div className="user-avatar-comment__admin item-comment__admin">
                    <IoMdPerson />
                </div>
                <div className="d-flex flex-column data-comment__admin">
                    <div className="name-user__admin d-flex justify-content-start item-comment__admin">
                        <span> <span>id: {obj.comment.id}</span> : {obj.comment.name}</span>
                        <div className="data-comment__admin">{obj.comment.created_at}</div>
                    </div>
                    <div className="comment-content__admin item-comment__admin">
                        <textarea
                            value={this.state.commentsContent[obj.comment.id] ? this.state.commentsContent[obj.comment.id] : ''}
                            onChange={this.handleTextArea}
                            className="text-area"
                            name="comment_content"
                            data-id={obj.comment.id}
                            id={"content-comment-" + obj.comment.id}
                            disabled={true}
                        >
                            {obj.comment.content}
                        </textarea>
                        <button style={{display:"none"}} id={"btn-change-comment-" + obj.comment.id} data-id={obj.comment.id} onClick={this.updateContentComment} className="btn btn-outline-success">ОБНОВИТЬ</button>
                    </div>
                </div>
                <div className="action-comment__admin d-flex align-items-center flex-row justify-content-center">
                    <div className="icon-action__admin">
                        {parseInt(obj.comment.status) !== 1 ? <MdCheckBoxOutlineBlank data-comment_id={obj.comment.id} data-status="1" onClick={this.handleChangeStatusComment}/> : <MdCheckBox data-comment_id={obj.comment.id} data-status="0" onClick={this.handleChangeStatusComment}/>}
                    </div>
                    <div className="icon-action__admin">
                        <MdEdit data-comment_id={obj.comment.id} onClick={this.editContentComment}/>
                    </div>
                    <div className="icon-action__admin">
                        {parseInt(obj.comment.status) !== 2 ? <IoIosEyeOff data-comment_id={obj.comment.id} data-status="2" onClick={this.handleChangeStatusComment}/> : <IoIosEye data-comment_id={obj.comment.id} data-status="1" onClick={this.handleChangeStatusComment}/>}

                    </div>
                    <div className="icon-action__admin">
                        {parseInt(obj.comment.status) !== 3 ? <MdDelete data-comment_id={obj.comment.id} data-status="3" onClick={this.handleChangeStatusComment}/> : <FaTrashRestore data-comment_id={obj.comment.id} data-status="0" onClick={this.handleChangeStatusComment}/>}
                    </div>
                </div>
            </div> );

        level++;
        Object.keys(obj.children).map(key => {
            result.push(
                <div key={obj.children[key].comment.id} style={{paddingLeft: level*30}}>
                    {/*<div className="d-flex"><IoIosRedo />{obj.comment.id}</div>*/}
                    {this.renderCommentsOnAdminPage(obj.children[key], level)}</div>);
        });
        return result;
    };

    componentDidMount() {
        adminAxios('/api/video/'+this.props.match.params.id)
            .then(res => {
                res.data.date = res.data.date.replace(' ', 'T')
                this.setState({
                    video: res.data
                });
                adminAxios('/api/video/'+res.data.id + '/comments')
                    .then(res => {
                        this.setState({
                            comments: res.data
                        });

                        res.data.forEach(el => {
                            this.setState({
                                commentsContent: {
                                    ...this.state.commentsContent,
                                    [el.id]: el.content
                                }
                            })
                        })
                    })
            })
    }

    render() {
        const allComments = setCommentsArray(this.state.comments);
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
                                    value={this.state.video.date}
                                    name="date"
                                    type="datetime-local"
                                />
                        </label>
                        <label className="d-flex align-items-center" htmlFor="name">
                            <span className="text-label__admin">Описание вебинара</span>
                            <textarea
                                className="admin-input-item form-control"
                                placeholder="Введите описание вебинара"
                                name="description"
                                value={this.state.video.description}
                                onChange={this.handleChange}

                            />
                        </label>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-secondary align-self-center" type="submit">Обновить информацию о вебинаре</button>
                        </div>

                    </form>
                </div>

                <div id={this.state.id} className="comments-admin container-content-admin flex-column">
                    <h1 className="text-center">Комментарии</h1>
                    <div className="comments-block__admin">
                        {allComments.map(comment => {
                            return this.renderCommentsOnAdminPage(comment)
                        })}
                    </div>

                </div>
            </div>
        );
    }
}

export default Update;
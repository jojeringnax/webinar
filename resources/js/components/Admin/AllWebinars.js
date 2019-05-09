import React from 'react';
import {adminAxios} from "../../functions";
import {Link} from "react-router-dom";

class AllWebinars extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            webinars : []
        }
    }
    componentDidMount() {
        adminAxios('/api/videos').then(res => {
            this.setState({
                webinars: res.data
            });
        })
    }


    render() {
        return (
            <div>
                <Link to="/admin/dashboard/webinar/create" className="btn btn-outline-success">Создать Вебинар</Link>
                <table className="table admin-table table-bordered z-depth-1">
                    <thead className="primary-color-dark border-secondary">
                    <tr className="">
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Link</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created_at</th>
                        <th scope="col">Updated_at</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        this.state.webinars.map(video => {
                            return(
                                <tr key={video.id}>
                                    <td key="id">{video.id}</td>
                                    <td key="title">{video.title}</td>
                                    <td key="link">{video.link}</td>
                                    <td key="date">{video.date}</td>
                                    <td key="status">{video.status}</td>
                                    <td key="created_at">{video.created_at}</td>
                                    <td key="updated_at">{video.updated_at}</td>
                                    <td key="actions">
                                        <Link to={"/admin/dashboard/webinar/update/" + video.id} className="btn btn-info">Update</Link>
                                        <Link to="" className="btn btn-danger">Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default AllWebinars;
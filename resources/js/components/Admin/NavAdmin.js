import React from 'react';
import ButtonBack from "../ButtonBack";
import Logout from "../../auth/Logout";
import {Link} from "react-router-dom";

class NavAdmin extends React.Component{
    render() {
        return (

            <div className="d-flex align-items-center justify-content-center" style={{width:"100%", height: "70vh"}}>
                <div className="dashboard__admin">
                    <div className="item-dashboard__admin">
                        <a href="/admin/dashboard/webinars">WEBINARS</a>
                    </div>
                    <div className="item-dashboard__admin" style={{opacity:"0.5"}}>
                        <Link to="#">USERS</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavAdmin;
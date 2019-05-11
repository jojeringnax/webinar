import React from 'react';
import {Link} from "react-router-dom";

class Notfound extends React.Component{
    render() {
        return (
            <div className="not-found sss d-flex flex-column align-items-center justify-content-center" style={{width: "100%", height:"100vh"}}>
                <h1 className="text-center">404</h1>
                <span>It looks like you're lost...</span>
                <Link to="/admin/dashboard" className="btn btn-outline-success">Time to go home</Link>
            </div>
        );
    }

}

export default Notfound;
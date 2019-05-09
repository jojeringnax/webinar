import React from 'react';
import Logout from "../../auth/Logout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Create from './webinar/Create';
import Update from './webinar/Update';
import AllWebinars from "./AllWebinars";

class DashboardAdmin extends React.Component{
    render() {
        return (
            <div className="container-admin">
                <div className="nav-bar nav-bar-admin">
                    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                        <a className="navbar-brand" href="#">AdminDashboard</a>
                        <Logout cookies={this.props.cookies}/>
                    </nav>
                </div>
                <div className="container ">
                    <div className="row" style={{width:"100%"}}>
                        <Router>
                            <Switch>
                                <Route exact path="/admin/dashboard/webinars" render={() => (<AllWebinars />)} />
                                <Route exact path="/admin/dashboard/webinar/create" render={() => (<Create />)} />
                                <Route exact path="/admin/dashboard/webinar/update/:id" component={Update} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>

        );
    }
}

export default DashboardAdmin;
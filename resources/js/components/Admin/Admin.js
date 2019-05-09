import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import RegisterComponent from "../../auth/RegisterComponent";
import Login from "../../auth/LoginComponent";
import DashboardAdmin from "./DashboardAdmin";


class Admin extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        {console.log(Boolean(this.props.cookies.get('isLogged')))}
        return (
            <div className="admin-page container">
                <div className="row">
                    <Router>
                        <Switch>
                            <Route exact path="/admin/register" render={() => (<RegisterComponent cookies={this.props.cookies}/>)} />
                            <Route exact path="/admin/login" render={() => (<Login cookies={this.props.cookies}/>)} />
                            {
                                !this.props.cookies.get('isLogged') && (<Redirect from="/admin" to="/admin/login" />)
                            }
                                <Route path="/admin/dashboard" render={() => (<DashboardAdmin cookies={this.props.cookies}/>)} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Admin;

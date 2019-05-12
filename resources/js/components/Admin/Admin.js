import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import RegisterComponent from "../../auth/RegisterComponent";
import Login from "../../auth/LoginComponent";
import DashboardAdmin from "./DashboardAdmin";
import NavAdmin from "./NavAdmin";
import ButtonBack from "../ButtonBack";
import Logout from "../../auth/Logout";
import {store} from "../Root";
import {setBackLink} from "../actions/actions";

class Admin extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="nav-bar nav-bar-admin">
                    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                        <ButtonBack />
                        <a className="navbar-brand" href="#">AdminDashboard</a>
                        <Logout cookies={this.props.cookies}/>
                    </nav>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <Router>
                            <Switch>
                                <Route exact path="/admin/register" render={() => (
                                        store.dispatch(setBackLink("/admin/dashboard")),
                                       <RegisterComponent cookies = {this.props.cookies}/>
                                    )
                                } />
                                <Route exact path="/admin/login" render={
                                    () => (
                                        store.dispatch(setBackLink("/admin/dashboard")),
                                        <Login cookies={this.props.cookies}/>
                                        )
                                } />
                                {
                                    !this.props.cookies.get('isLogged') && (<Redirect from="/admin" to="/admin/login" />)
                                }
                                <Route exact path="/admin" render={() => (<Redirect to="/admin/dashboard"/>)} />
                                <Route exact path="/admin/dashboard" render={() => (store.dispatch(setBackLink("/admin/dashboard")), <NavAdmin cookies={this.props.cookies}/>)} />
                                <Route render={() => (<DashboardAdmin   cookies={this.props.cookies}/>)} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;

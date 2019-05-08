import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WebinarPage from './Webinar/WebinarPage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DashboardAdmin from "./Admin/DashboardAdmin";
import LoginComponent from "../auth/LoginComponent";
import RegisterComponent from "../auth/RegisterComponent";
import { withCookies } from 'react-cookie';
import Auth from "./containers/Auth";


class App extends Component {

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/admin" render={() => (<Auth cookies={this.props.cookies}/>)} />
                    <Route exact path="/admin/register" component={RegisterComponent} />
                    <Route exact path="/admin/login" component={LoginComponent} />
                    <Route exact path="/admin/dashboard" component={DashboardAdmin} />
                </Switch>
            </Router>

        );
    }
}

export default withCookies(App);

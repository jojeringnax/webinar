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

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            cookies: false
        };
        console.log(cookies.get('user').auth_token);
        if (!cookies.get('isLogged')) {
            alert('faf');
            cookies.set('user', {
                auth_token: "",
                email: "",
                id: 0,
                name: "",
                timestamp: ""
            }, {path: "/"});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cookies !== this.props.cookies) {
            this.setState({cookies: !cookies})
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/admin" render={() => (<Auth cookies={this.props.cookies}/>)} />
                    <Route exact path="/admin/register" render={() => (<RegisterComponent cookies={this.props.cookies}/>)} />
                    <Route exact path="/admin/login" component={LoginComponent} />
                    <Route exact path="/admin/dashboard" component={DashboardAdmin} />
                </Switch>
            </Router>

        );
    }
}

export default withCookies(App);

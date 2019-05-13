import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import Auth from './containers/Auth';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {store} from "./Root";
import {setAuth} from "./actions/actions";
import WebinarPage from './Webinar/WebinarPage';
import Notfound from './Notfound';
import AllWebinarsForUser from "./Webinar/AllWebinarsForUser";
class App extends Component {

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            cookies: false
        };
        if (!cookies.get('isLogged')) {
            cookies.set('user', {
                auth_token: "",
                email: "",
                id: 0,
                name: "",
                timestamp: ""
            }, {path: "/"});
        }

        store.dispatch(setAuth(true, cookies.get('user')));
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
                    <Route exact path="/" render={({...routeProps}) => (<AllWebinarsForUser {...routeProps} cookies={this.props.cookies}/>)} />
                    <Route path="/admin" render={({...routeProps}) => (<Auth {...routeProps} cookies={this.props.cookies}/>)} />
                    {/*<Route path="/webinar" render={() => (<WebinarPage cookies={this.props.cookies}/>)} />*/}
                    <Route exact path="/webinar/:id" render={({...routeProps}) => (<WebinarPage {...routeProps} cookies={this.props.cookies}/>)} />
                    <Route component={Notfound} />
                </Switch>
            </Router>
        );
    }
}

export default withCookies(App);

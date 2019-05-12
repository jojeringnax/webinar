import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Create from './webinar/Create';
import Update from './webinar/Update';
import AllWebinars from "./AllWebinars";
import Notfound from "../Notfound";
import {store} from "../Root";
import {setBackLink} from "../actions/actions";

class DashboardAdmin extends React.Component{
    render() {
        return (
            <div className="container-admin">
                <div className="container ">
                    <div className="row" style={{width:"100%"}}>
                        <Router>
                            <Switch>
                                {/*<Route exact path="/admin/" render={() => (<DashboardAdmin />)} />*/}
                                <Route exact path="/admin/dashboard/webinars" render={() => (store.dispatch(setBackLink("/admin/dashboard")), <AllWebinars />)} />
                                <Route exact path="/admin/dashboard/webinar/create" render={() => (store.dispatch(setBackLink("/admin/dashboard/webinars")), <Create />)} />
                                <Route exact path="/admin/dashboard/webinar/update/:id" render={({...routeProps}) => (store.dispatch(setBackLink("/admin/dashboard/webinars")), <Update {...routeProps} />)} />
                                <Route component={ Notfound } />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>

        );
    }
}

export default DashboardAdmin;
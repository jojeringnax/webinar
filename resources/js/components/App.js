import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Webinar from './Webinar/Webinar';
import jquery from 'jquery';
import axios from 'axios';
import Login from "../auth/LoginComponent";
import Register from "../auth/RegisterComponent";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {auth_token: ""}
        };

        const $ = jquery;
        this._registerUser = (name, email, password) => {
            $("#email-login-btn")
                .attr("disabled", "disabled")
                .html(
                    '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
                );
            let formData = new FormData();
            formData.append("password", password);
            formData.append("email", email);
            formData.append("name", name);
            axios
                .post("/api/user/register", formData)
                .then(response => {
                    console.log(response);
                    return response;
                })
                .then(json => {
                    if (json.data.success) {
                        alert(`Registration Successful!`);

                        let userData = {
                            name: json.data.data.name,
                            id: json.data.data.id,
                            email: json.data.data.email,
                            auth_token: json.data.data.auth_token,
                            timestamp: new Date().toString()
                        };
                        let appState = {
                            isLoggedIn: true,
                            user: userData
                        };
                        // save app state with user date in local storage
                        localStorage["appState"] = JSON.stringify(appState);
                        this.setState({
                            isLoggedIn: appState.isLoggedIn,
                            user: appState.user
                        });
                    } else {
                        alert(`Registration Failed!`);
                        $("#email-login-btn")
                            .removeAttr("disabled")
                            .html("Register");
                    }
                })
                .catch(error => {
                    alert("An Error Occured!" + error);
                    console.log(`${formData} ${error}`);
                    $("#email-login-btn")
                        .removeAttr("disabled")
                        .html("Register");
                });
        };

        this._loginUser = (email, password) => {
            $("#login-form button")
                .attr("disabled", "disabled")
                .html(
                    '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
                );
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            axios
                .post("/api/user/login", formData)
                .then(response => {
                    console.log(response);
                    return response;
                })
                .then(json => {
                    if (json.data.success) {
                        alert("Login Successful!");
                        let userData = {
                            name: json.data.data.name,
                            id: json.data.data.id,
                            email: json.data.data.email,
                            auth_token: json.data.data.auth_token,
                            timestamp: new Date().toString()
                        };
                        let appState = {
                            isLoggedIn: true,
                            user: userData
                        };
                        this.setState({
                            isLoggedIn: appState.isLoggedIn,
                            user: appState.user,
                        });
                    } else alert("Login Failed!");

                    $("#login-form button")
                        .removeAttr("disabled")
                        .html("Login");
                })
                .catch(error => {
                    alert(`An Error Occured! ${error}`);
                    $("#login-form button")
                        .removeAttr("disabled")
                        .html("Login");
                });
        };

        this._logoutUser = () => {
            let appState = {
                isLoggedIn: false,
                user: {}
            };
            this.setState(appState);
        };

        this.handleClick = () =>  {
            console.log(this.state);
            axios.get('/api/users/list?token=' + this.state.user.auth_token)
                .then(res => {
                    console.log(res)
                });
        }
    }

    componentDidMount() {
        console.log(this.state);
    }





    render() {
        return (
            <div className="app">
                <a onClick={this.handleClick}>Nice</a>
                <Login loginUser={this._loginUser}/>

                <Register registerUser={this._registerUser}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


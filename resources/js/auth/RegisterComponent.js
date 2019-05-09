import React from "react";
import { Link } from "react-router-dom";
import jquery from "jquery";
import axios from "axios";
import {store} from "../components/Root";
import {setAuth} from "../components/actions/actions";

class Register extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoggedIn: false,
            user: {auth_token: ""},
            userData: {
                name: '',
                email: '',
                password: ''
            }
        };

        const $ = jquery;

        this.changeInput = (e) => {
            this.setState({
                userData: {
                    ...this.state.userData,
                    [e.target.name]: e.target.value
                }

            })
        };

        this._registerUser = (e) => {
            e.preventDefault();
            $("#email-login-btn")
                .attr("disabled", "disabled")
                .html(
                    '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
                );
            let formData = new FormData();
            formData.append("name", this.state.userData.name);
            formData.append("email", this.state.userData.email);
            formData.append("password", this.state.userData.password);
            axios
                .post("/api/user/register", formData)
                .then(response => {
                    console.log(response);
                    return response;
                })
                .then(json => {
                    if (json.data.success) {
                        alert(`Registration Successful!`);
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


    render() {
        return (
            <div className="container">
                <div className={'vlad'}>{this.props.cookies.get('user').name}</div>
                <div className="row">
                    <div id="main">
                        <form id="register-form" onSubmit={this._registerUser} method="post">
                            <h3 style={{ padding: 15 }}>Register Form</h3>
                            <input onChange={this.changeInput} value={this.state.name} ref={input => (this._name = input)} autoComplete="off" id="name-input-register" name="name" type="text" className="center-block" placeholder="Name" />
                            <input onChange={this.changeInput} value={this.state.email} ref={input => (this._email = input)} autoComplete="off" id="email-input-register" name="email" type="text" className="center-block" placeholder="Email" />
                            <input onChange={this.changeInput} value={this.state.password} ref={input => (this._password = input)} autoComplete="off" id="password-input-register" name="password" type="password" className="center-block" placeholder="password" />
                            <button type="submit" className="landing-page-btn center-block text-center" id="submit-register" href="#facebook" >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

export default Register;
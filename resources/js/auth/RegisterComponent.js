import React from "react";
import jquery from "jquery";
import axios from "axios";

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
            axios.get('/api/users/list?token=' + this.state.user.auth_token)
                .then(res => {
                    console.log(res)
                });
        }
    }


    render() {
        return (
            <div className="container">
                {/*<div className={'vlad'}>{this.props.cookies.get('user').name}</div>*/}
                <div className="row">
                    <div id="register-form__admin" className="d-flex align-items-center justify-content-center" >
                        <form id="" onSubmit={this._registerUser} method="post">
                            <div className="card">
                                <div className="card-head">
                                    <h3 style={{ padding: 15 }}>Register Form</h3>
                                </div>
                                <div className="card-body">
                                    <input
                                        onChange={this.changeInput}
                                        value={this.state.name}
                                        ref={input => (this._name = input)}
                                        autoComplete="off" id="name-input-register"
                                        name="name"
                                        type="text"
                                        className="center-block form-control"
                                        placeholder="Name"
                                    />
                                    <input
                                        onChange={this.changeInput}
                                        value={this.state.email}
                                        ref={input => (this._email = input)}
                                        autoComplete="off" id="email-input-register"
                                        name="email"
                                        type="text"
                                        className="center-block form-control"
                                        placeholder="Email" />
                                    <input
                                        onChange={this.changeInput}
                                        value={this.state.password}
                                        ref={input => (this._password = input)}
                                        autoComplete="off"
                                        id="password-input-register"
                                        name="password"
                                        type="password"
                                        className="center-block form-control"
                                        placeholder="password"
                                    />
                                    <button type="submit" className="landing-page-btn center-block text-center btn btn-outline-success" id="submit-register" href="#facebook" >
                                        Register
                                    </button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

export default Register;
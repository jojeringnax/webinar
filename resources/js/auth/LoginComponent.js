import React from "react";
import axios from "axios";
import jquery from "jquery";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogged: Boolean(props.cookies.get('isLogged'))
        };

        this.onChangeInput = (e) => {
          this.setState({
              [e.target.name]: e.target.value
          })
        };

        const {cookies} = this.props;

        this._loginUser = (e) => {
            e.preventDefault();
            const $ = jquery;
            $("#login-form button")
                .attr("disabled", "disabled")
                .html(
                    '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
                );
            let formData = new FormData();
            formData.append("email", this.state.email);
            formData.append("password", this.state.password);
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
                        cookies.set('isLogged', true, {path: '/'});
                        cookies.set('user', userData, {path: '/'});
                        document.location.href = '/admin/dashboard';

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
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="text-center login-form__title">Webinars</h1>
                    <div id="login-form__main" className="d-flex align-content-center justify-content-center" >
                        <form id="login-form" className="form-group" onSubmit={this._loginUser} method="post">

                            <div className="card">
                                <div className="card-head">
                                    <h3 style={{padding: 15}} className="text-center">Login Form</h3>
                                </div>
                                <div className="card-body">
                                    <input
                                        onChange={this.onChangeInput}
                                        value={this.state.email}
                                        ref={input => (this._email = input)}
                                        autoComplete="off"
                                        id="email-input-login"
                                        name="email"
                                        type="text"
                                        className="center-block form-control"
                                        placeholder="email"
                                    />
                                    <input
                                        onChange={this.onChangeInput}
                                        value={this.state.password}
                                        ref={input => (this._password = input)}
                                        autoComplete="off"
                                        id="password-input-login"
                                        name="password"
                                        type="password"
                                        className="center-block form-control"
                                        placeholder="password"
                                    />
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-success"
                                            id="submit-login">
                                            {this.state.isLogged ? 'Logged': 'Login'}
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>

        );
    }


}

export default  Login;
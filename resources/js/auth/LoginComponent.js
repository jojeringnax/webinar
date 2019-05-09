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
                    <div id="main">
                        <form id="login-form" onSubmit={this._loginUser} method="post">
                            <h3 style={{padding: 15}}>Login Form</h3>
                            <input onChange={this.onChangeInput} value={this.state.email} ref={input => (this._email = input)} autoComplete="off" id="email-input-login"
                                   name="email" type="text" className="center-block" placeholder="email"/>
                            <input onChange={this.onChangeInput} value={this.state.password} ref={input => (this._password = input)} autoComplete="off" id="password-input-login"
                                   name="password" type="password" className="center-block" placeholder="password"/>
                            <button type="submit" className="btn btn-success"
                                    id="submit-login">
                                {this.state.isLogged ? 'Logged': 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }


}

export default  Login;
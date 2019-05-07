import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component
{
    constructor(props) {
        super(props);

        this.handleLogin = (e) => {
            e.preventDefault();
            props.loginUser(this._email.value, this._password.value);
        };

    }


    render() {
        return (
            <div id="main">
                <form id="login-form" action="" onSubmit={this.handleLogin} method="post">
                    <h3 style={{padding: 15}}>Login Form</h3>
                    <input ref={input => (this._email = input)} autoComplete="off" id="email-input-login"
                           name="email" type="text" className="center-block" placeholder="email"/>
                    <input ref={input => (this._password = input)} autoComplete="off" id="password-input-login"
                           name="password" type="password" className="center-block" placeholder="password"/>
                    <button type="submit" className="btn btn-success"
                            id="submit-login">
                        Login
                    </button>
                </form>
            </div>
        );
    }


}

export default  Login;
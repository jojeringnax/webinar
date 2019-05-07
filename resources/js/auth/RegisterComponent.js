import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegistration = e => {
            e.preventDefault();
            props.registerUser(this._name.value, this._email.value, this._password.value);
        };

    }

    render() {
        return (
            <div id="main">
                <form id="register-form" action="" onSubmit={this.handleRegistration} method="post">
                    <h3 style={{ padding: 15 }}>Register Form</h3>
                    <input ref={input => (this._name = input)} autoComplete="off" id="name-input-register" name="name" type="text" className="center-block" placeholder="Name" />
                    <input ref={input => (this._email = input)} autoComplete="off" id="email-input-register" name="email" type="text" className="center-block" placeholder="Email" />
                    <input ref={input => (this._password = input)} autoComplete="off" id="password-input-register" name="password" type="password" className="center-block" placeholder="password" />
                    <button type="submit" className="landing-page-btn center-block text-center" id="submit-register" href="#facebook" >
                        Register
                    </button>
                </form>
            </div>
        );
    }

}

export default Register;
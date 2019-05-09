import React from 'react';

class Logout extends React.Component{

    logout = () => {
        this.props.cookies.set('user', {
            auth_token: "",
            email: "",
            id: 0,
            name: "",
            timestamp: ""
        }, {path: "/"});
        this.props.cookies.remove('isLogged', {path:'/'});
        document.location.href = "/admin";
    };

    render() {
        return (
            <div>
                <button onClick={this.logout} className="btn btn-danger">Logout</button>
            </div>
        );
    }
}

export default Logout;
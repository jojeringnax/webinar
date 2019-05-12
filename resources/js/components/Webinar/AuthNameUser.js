import React from 'react';

class AuthNameUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    sendName = () => {
        this.props.sendName(this.state.name);
        this.props.cookies.set('name', this.state.name, {path: "/"});
    };


    render() {
        return (
            <div className="mod-web__userName">
                <div className="card">
                    <div className="card-head">
                        <h4 className="text-center">Введите имя</h4>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <input onChange={this.handleChangeName} name="name" type="text" className="form-control" value={this.state.value}/>
                        <button onClick={this.sendName} className="btn btn-outline-success">АВТОРИЗОВАТЬСЯ</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthNameUser;
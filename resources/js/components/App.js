import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Webinar from './Webinar/Webinar'

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Webinar />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


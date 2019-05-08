import React from 'react'
import ReactDOM from 'react-dom'
import Root, {store} from "./components/Root";



ReactDOM.render(<Root store={store}/>, document.getElementById('app'));
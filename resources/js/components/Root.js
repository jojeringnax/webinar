import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Switch, Route,Redirect, BrowserRouter  as Router} from 'react-router-dom';
import App from './App'
import Admin from './Admin/Admin';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import RegisterComponent from '../auth/RegisterComponent';

import LoginComponent from '../auth/LoginComponent';
import DashboardAdmin from './Admin/DashboardAdmin';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';

export let store = createStore(rootReducer, applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Root = ({ store }) => (
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
);

export default Root;
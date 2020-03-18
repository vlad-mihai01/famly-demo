import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'

import browserHistory from './utils/history'


import './style.scss'
import createRootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

ReactDOM.render(
    <Provider store={createStore(createRootReducer(browserHistory), composeWithDevTools(applyMiddleware(
        routerMiddleware(browserHistory), 
      ),))}>
        <Router>
            <ConnectedRouter history={browserHistory}>
                <App />
            </ConnectedRouter>
        </Router>
    </Provider>,
    document.getElementById("root"));
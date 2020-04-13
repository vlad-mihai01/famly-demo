import { hot } from 'react-hot-loader/root';
import React, { Component } from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import {
    routeHome,
    routeListSignIn,
    routeListSignOut,
    routeReceiptSignIn,
    routeReceiptSignOut,
    routeSignIn,
    routeSignOut
} from './routes'

import Background from './components/Background'
import Header from './components/Header'

import List from './pages/List'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import Receipt from './pages/Receipt'


class App extends Component<{}> {

    render() {

        return (
            <>
                <Background />
                <Header />
                <Switch>
                    <Route exact path={routeHome}>
                        <Redirect to={routeListSignIn} />
                    </Route>
                    <Route exact path={routeListSignIn} component={List} />
                    <Route exact path={routeListSignOut} component={List} />
                    <Route exact path={routeSignIn()} component={SignIn} />
                    <Route exact path={routeReceiptSignIn()} component={Receipt} />
                    <Route exact path={routeReceiptSignOut} component={Receipt} />
                    <Route exact path={routeSignOut()} component={SignOut} />
                </Switch>
            </>
        );
    }
}


export default hot(App);
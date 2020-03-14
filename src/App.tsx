import React, { Component } from "react";
import {
    Switch,
    Route,
    withRouter,
    RouteComponentProps,
    Redirect,
} from "react-router-dom";

import Background from './components/Background'
import Header from './components/Header'
import ListSignIn from './pages/ListSignIn'
import ListSignOut from './pages/ListSignOut'


type TProps = RouteComponentProps

class App extends Component<TProps> {

    render() {

        return (
            <>
                <Background />
                <Header />
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/signin'/>
                        </Route>
                        <Route exact path='/signin'>
                            <ListSignIn/>
                        </Route>
                        <Route exact path='/signout'>
                            <ListSignOut />
                        </Route>
                    </Switch>
            </>
        );
    }
}


export default withRouter(App);
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
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'


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
                        <Route exact path='/signin' component={ListSignIn}/>
                        <Route exact path='/signout' component={ListSignOut}/>
                        <Route path="/signin/:childId" component={SignIn} />
                        <Route path="/signout/:childId" component={SignOut} />
                    </Switch>
            </>
        );
    }
}


export default withRouter(App);
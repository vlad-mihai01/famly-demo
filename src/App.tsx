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
import Receipt from './pages/Receipt'


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
                        <Route exact path="/signin/:childId" component={SignIn} />
                        <Route exact path="/signin/receipt/:pickUpTime" component={Receipt}/>
                        <Route exact path="/signout/receipt" component={Receipt} />
                        <Route exact path="/signout/:childId" component={SignOut} />
                    </Switch>
            </>
        );
    }
}


export default withRouter(App);
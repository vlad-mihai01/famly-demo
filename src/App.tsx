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


type TProps = RouteComponentProps

class App extends Component<TProps> {

    render() {

        return (
            <>
                <Background />
                <Header />
                <div className={`container-fluid`}>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/signin' />
                        </Route>
                        <Route exact path='/signin'>
                            signin
                    </Route>
                        <Route exact path='/signout'>
                            signout
                    </Route>
                    </Switch>


                </div>
            </>
        );
    }
}


export default withRouter(App);
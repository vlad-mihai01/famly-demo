import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";

type TProps = RouteComponentProps

const Background: React.FunctionComponent<TProps>= ({location}) => {

    const bgSignIn = location.pathname.includes('/signin') ? true : false

    return (
        <div className={`background ${bgSignIn?'sIn':'sOut'}`}>
            <div className={`bg-signin ${bgSignIn?'dis':'act'}`}></div>
            <div className={`bg-signout ${bgSignIn?'act':'dis'}`}></div>
        </div>
    )
}

export default withRouter(Background) 
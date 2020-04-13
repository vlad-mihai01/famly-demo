import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {routeListSignIn, routeListSignOut} from 'Routes'
type TProps = RouteComponentProps

const Header:React.FunctionComponent<TProps>= ({location}) => {

    const listSignIn = location.pathname.includes(routeListSignIn) ? true : false

    const hideSignOut = listSignIn && location.pathname !== routeListSignIn ? true : false
    const hideSignIn = !listSignIn && location.pathname !== routeListSignOut ? true : false

        return (
            <header className={`${listSignIn ? 'hsi' : 'hso'}`}>
                <div className={`btn-si ${listSignIn?'dis':''} ${hideSignIn?'hide':''}`}>
                    {!listSignIn ? <Link to={routeListSignIn}>Sign in</Link> : <p>Sign in</p>}
                </div>

                <div className={`btn-so ${!listSignIn?'dis':''} ${hideSignOut?'hide':''}`}>
                    {listSignIn ? <Link to={routeListSignOut}>Sign out</Link> : <p>Sign out</p>}
                </div>
            </header>
        )
    

}


export default withRouter(Header)
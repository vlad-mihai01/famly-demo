import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

type TProps = RouteComponentProps

const Header:React.FunctionComponent<TProps>= ({location}) => {

    const locSignIn = location.pathname === '/signin' ? true : false

        return (
            <header className={`${locSignIn ? 'hsi' : 'hso'}`}>
                <div className={`btn-si ${locSignIn?'dis':''}`}>
                    {!locSignIn ? <Link to='/signin'>Sign in</Link> : <p>Sign in</p>}
                </div>

                <div className={`btn-so ${!locSignIn?'dis':''}`}>
                    {locSignIn ? <Link to='/signout'>Sign out</Link> : <p>Sign out</p>}
                </div>
            </header>
        )
    

}


export default withRouter(Header)
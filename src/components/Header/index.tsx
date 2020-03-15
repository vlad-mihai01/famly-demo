import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

type TProps = RouteComponentProps

const Header:React.FunctionComponent<TProps>= ({location}) => {

    const listSignIn = location.pathname.includes('/signin') ? true : false

    const hideSignOut = listSignIn && location.pathname !== '/signin' ? true : false
    const hideSignIn = !listSignIn && location.pathname !== '/signout' ? true : false

        return (
            <header className={`${listSignIn ? 'hsi' : 'hso'}`}>
                <div className={`btn-si ${listSignIn?'dis':''} ${hideSignIn?'hide':''}`}>
                    {!listSignIn ? <Link to='/signin'>Sign in</Link> : <p>Sign in</p>}
                </div>

                <div className={`btn-so ${!listSignIn?'dis':''} ${hideSignOut?'hide':''}`}>
                    {listSignIn ? <Link to='/signout'>Sign out</Link> : <p>Sign out</p>}
                </div>
            </header>
        )
    

}


export default withRouter(Header)
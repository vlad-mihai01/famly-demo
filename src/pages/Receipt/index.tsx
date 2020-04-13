import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Octicon, { Check } from '@primer/octicons-react'
import {routeListSignIn, routeListSignOut} from 'Routes'
interface IReducerProps {
    reducerCurrentChild: any
}
type TParams = { pickUpTime: string }

type TProps = RouteComponentProps<TParams> & IReducerProps

class Receipt extends Component<TProps>{
    public componentDidMount(){
        this.redirectToHome()
    }

    public render() {
        const { reducerCurrentChild, match } = this.props
        const { name, image } = reducerCurrentChild

        const listSignIn = location.pathname.includes(routeListSignIn) ? true : false
        const theme = listSignIn ? 'light' : 'dark'

        return (
            <div className={`container-receipt ${theme}`}>
                <div className='container-image'>
                    <img src={image.large} alt="" />
                    <Octicon icon={Check} />
                </div>

                {listSignIn && (
                    <>
                        <p>{name.firstName} is signed in</p>
                        <span>
                            <p>Pick up time</p>
                            <p>{match.params.pickUpTime}</p>
                        </span>
                        <p>Enjoy your day</p>
                    </>
                )}
                {!listSignIn && (
                    <>
                        <p>{name.firstName} is signed out</p>
                        <p>See you tomorrow</p>
                    </>
                )}
            </div>
        )
    }

    private redirectToHome = () => {
        const {history} = this.props
        const listSignIn = location.pathname.includes(routeListSignIn) ? true : false
        if(listSignIn){
            setTimeout(()=>history.replace(routeListSignIn),2000) 
        } else {
            setTimeout(()=>history.replace(routeListSignOut),2000)
            
        }
    }
}

const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})


export default connect(mapStateToProps)(Receipt)
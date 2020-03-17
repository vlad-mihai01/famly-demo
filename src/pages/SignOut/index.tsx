import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';


import { postCheckoutChild } from '../../api';

interface IReducerProps {
    reducerCurrentChild: any
}
type TProps = RouteComponentProps & IReducerProps

class SignOut extends Component<TProps> {


    render() {

        const { reducerCurrentChild, history } = this.props
        const { name, image } = reducerCurrentChild
        return (
            <div className='container-sign-out'>
                <div className='container-details'>
                    <img src={image.large} alt="" />
                    <p>{name.firstName}</p>
                </div>
                <div className='container-actions'>
                    <button onClick={history.goBack} className='btn-dark-secondary' type="button">Back</button>
                    <button onClick={this.signOutChild} className='btn-dark-primary' type="button">Sign out</button>
                </div>
            </div>
        )
    }

    private signOutChild = async () => {
        const { childId } = this.props.reducerCurrentChild
        const res = await postCheckoutChild(childId).catch(err => { console.error(err); })
        if(res && res.data){ 
            this.props.history.replace('/signout/receipt');
        }
    }

}


const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})

export default connect(mapStateToProps)(SignOut)

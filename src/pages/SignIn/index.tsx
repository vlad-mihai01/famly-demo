import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';

import TimePicker from '../../components/TimePicker'
import { postCheckinChild } from '../../api';

import {routeReceiptSignIn, routeListSignIn} from 'Routes'


interface IState {
    pickUpTime: any
}

interface IReducerProps {
    reducerCurrentChild: any
}
type TProps = RouteComponentProps & IReducerProps

class SignIn extends Component<TProps, IState> {
    public constructor(props: TProps) {
        super(props)

        this.state = {
            pickUpTime: undefined
        }
    }

    render() {
        if (!this.props.reducerCurrentChild) {
            return  <Redirect to={routeListSignIn} />
        }

        const { reducerCurrentChild, history } = this.props
        const { name, image } = reducerCurrentChild

        const pickUpHours = [9, 10, 11, 17, 18, 19, 20, 21, 22, 23]
        const pickUpMinutes = [0, 15, 30, 45]

        return (
            <div className='container-sign-in'>
                <div className='container-details'>
                    <div className='child-info'>
                        <img src={image.large} alt="" />
                        <p>{name.firstName}</p>
                        <p>{name.lastName}</p>
                    </div>
                    <div className='pickup-info'>
                        <p>Choose pick up time</p>

                        <TimePicker
                            mode12={true}
                            initialTimeArray={true}
                            hoursArray={pickUpHours}
                            minutesArray={pickUpMinutes}
                            returnTimeFunction={this.setPickUpTime}
                        />

                    </div>
                </div>
                <div className='container-actions'>
                    <button onClick={history.goBack} className='btn-light-secondary' type="button">Back</button>
                    <button onClick={this.signInChild} className='btn-light-primary' type="button">Sign in</button>
                </div>
            </div>
        )
    }

    private setPickUpTime = (time: any) => {
        this.setState({ pickUpTime: time })
    }


    private signInChild = async () => {
        const { pickUpTime } = this.state
        const { hour, minutes, amPm } = pickUpTime
        const { childId } = this.props.reducerCurrentChild

        const apiPickUpTime = `${hour.value}:${minutes.value}`
        const stringPickUpTime = `${hour.text}:${minutes.text} ${amPm?amPm:''}`

        const res = await postCheckinChild(childId, apiPickUpTime).catch(err => { console.error(err); })
        if (res && res.data) {
            this.props.history.replace(routeReceiptSignIn(stringPickUpTime));
        }
    }
}

const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})


export default connect(mapStateToProps)(SignIn)
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import TimePicker from '../../components/TimePicker'
import { postCheckinChild } from '../../api';


type amPm = 'am' | 'pm' | ''

interface IState {
    pickUpHour: number | any
    pickUpMinutes: number | string
    pickUpAmPm: amPm
    hoursArray: any
    minutesArray: any
}

interface IReducerProps {
    reducerCurrentChild: any
}
type TProps = RouteComponentProps & IReducerProps

class SignIn extends Component<TProps, IState> {
    public constructor(props: TProps) {
        super(props)

        this.state = {
            pickUpHour: '',
            pickUpMinutes: '',
            pickUpAmPm: '',
            hoursArray: [],
            minutesArray: []
        }
    }

    render() {
        const { reducerCurrentChild, history } = this.props
        const { name, image } = reducerCurrentChild

        const pickUpHours = [10,11,12,13,14,15,16,17]
        const pickUpMinutes = [0,15,30,45]

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
                            initialTime={
                                {
                                    hour: 15,
                                    minutes: 25
                                }
                            }
                            mode12={true}
                            hoursArray={pickUpHours}
                            minutesArray={pickUpMinutes}
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


    private signInChild = async () => {
        const { pickUpHour, pickUpMinutes } = this.state
        const { childId } = this.props.reducerCurrentChild
        const pickUpTime = `${pickUpHour}:${pickUpMinutes}`

        const res = await postCheckinChild(childId, pickUpTime).catch(err => { console.error(err); })
        if (res && res.data) {
            this.props.history.replace(`/signin/receipt/${pickUpTime}`);
        }

    }
}

const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})


export default connect(mapStateToProps)(SignIn)
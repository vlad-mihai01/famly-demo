import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import TimePicker from '../../components/TimePicker'
type amPm = 'am' | 'pm' | ''

interface IState {
    pickUpHour: number | string
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

    public componentDidMount() {
        this.initialisePickUpTime()
    }

    render() {
        console.log(this.props);
        const { pickUpAmPm, pickUpMinutes, pickUpHour, hoursArray, minutesArray } = this.state

        const { reducerCurrentChild, history } = this.props
        const { name, image } = reducerCurrentChild

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
                            hour={pickUpHour}
                            minutes={pickUpMinutes}
                            amPm={pickUpAmPm}
                            hoursArray={hoursArray}
                            minutesArray={minutesArray}
                        />

                    </div>
                </div>
                <div className='container-actions'>
                    <button onClick={history.goBack} className='btn-light-secondary' type="button">Back</button>
                    <button className='btn-light-primary' type="button">Sign in</button>
                </div>
            </div>
        )
    }

    private initialisePickUpTime = () => {
        const currentTime = this.getCurrentTime()

        const amPm = currentTime.hour <= 12 ? 'am' : 'pm'
        const currentHour = currentTime.hour
        const currentMinutes = currentTime.minutes

        const pickUpTimesHours = [
            {
                title: 'am',
                values: [9, 10, 11, 12]
            },
            {
                title: 'pm',
                values: [13, 14, 15, 16, 17, 18]
            }
        ]

        const pickUpTimesMinutes = [
            {
                title: 'minutes',
                values: [0, 15, 30, 45]
            },
        ]

        this.setState({
            pickUpAmPm: amPm,
            pickUpHour: currentHour,
            pickUpMinutes: currentMinutes,
            hoursArray: pickUpTimesHours,
            minutesArray: pickUpTimesMinutes
        })
    }

    private getCurrentTime = () => {
        const now = new Date();
        const hour = now.getHours()
        const minutes = now.getMinutes()

        return { hour, minutes }
    }
}

const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})


export default connect(mapStateToProps)(SignIn)
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

    public componentDidMount() {
        this.initialisePickUpTime()
    }

    render() {
        const { pickUpAmPm, pickUpMinutes, pickUpHour, hoursArray, minutesArray } = this.state
        const { reducerCurrentChild, history } = this.props
        const { name, image } = reducerCurrentChild

        const hour = pickUpHour <=12 ? pickUpHour : pickUpHour % 12

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
                            hour={hour}
                            minutes={pickUpMinutes}
                            amPm={pickUpAmPm}
                            hoursArray={hoursArray}
                            minutesArray={minutesArray}
                            updatePickUpHour={this.updatePickUpHour}
                            updatePickUpMinutes={this.updatePickUpMinutes}
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

    private initialisePickUpTime = () => {
        const currentTime = this.getCurrentTime()

        const amPm = currentTime.hour <= 12 ? 'am' : 'pm'
        const currentHour = currentTime.hour + 1
        const currentMinutes = currentTime.minutes

        const pickUpTimesHours = [
            {
                title: 'am',
                values: [
                    {
                        value: 11,
                        text: 11
                    },
                    {
                        value: 12,
                        text: 12
                    }
                ]
            },
            {
                title: 'pm',
                values: [
                    {
                        value: 13,
                        text: 1
                    },
                    {
                        value: 14,
                        text: 2
                    },
                    {
                        value: 15,
                        text: 3
                    },
                    {
                        value: 16,
                        text: 4
                    },
                    {
                        value: 17,
                        text: 5
                    }

                ]
            }
        ]

        const pickUpTimesMinutes = [
            {
                title: 'minutes',
                values: [
                    {
                        value: 0,
                        text: '00'
                    },
                    {
                        value: 15,
                        text: '15'
                    },
                    {
                        value: 30,
                        text: '30'
                    },
                    {
                        value: 45,
                        text: '45'
                    }
                ]
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

    private updatePickUpHour = (value: number) => {
        const amPM = value <= 12 ? 'am' : 'pm'
        this.setState({ pickUpHour: value, pickUpAmPm:amPM })
    }

    private updatePickUpMinutes = (value: number) => {
        this.setState({ pickUpMinutes: value })
    }

    private signInChild = async () => {
        const {pickUpHour,pickUpMinutes} = this.state
        const {childId} = this.props.reducerCurrentChild
        const pickUpTime = `${pickUpHour}:${pickUpMinutes}`

        const res = await postCheckinChild(childId,pickUpTime).catch(err => { console.error(err); })
        res && res.data && console.log(res.data);
        
    }
}

const mapStateToProps = (state: any) => ({
    reducerCurrentChild: state.reducerCurrentChild
})


export default connect(mapStateToProps)(SignIn)
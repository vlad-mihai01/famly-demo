import React, { Component } from 'react'

interface time {
    title: string
    values: number[]
}

type amPm = 'am' | 'pm' | ''

interface IOwnProps {
    hour: number | string
    minutes: number | string
    amPm: amPm
    hoursArray: time[]
    minutesArray: time[]
}

interface IState {
    hoursOpen: boolean
    minutesOpen: boolean
}

class TimePicker extends Component<IOwnProps, IState>{
    public state: IState = {
        hoursOpen: false,
        minutesOpen: false
    }

    public render() {

        const { hour, amPm, minutes } = this.props

        return (
            <div className='container-timer'>
                <div className='clock'>
                    <button>{hour}</button>
                    <span>:</span>
                    <button>{minutes}</button>
                    <span>{amPm}</span>
                </div>
                <div className='container-picker'>
                    {this.renderHours()}
                </div>
                <div className='container-picker'>
                    {this.renderMinutes()}
                </div>
            </div>
        )
    }

    private renderHours = () => {
        return (
            <>
                {this.renderTimes(this.props.hoursArray)}
            </>
        )
    }

    private renderMinutes = () => {

        return (
            <>{this.renderTimes(this.props.minutesArray)}</>
        )
    }

    private renderTimes = (times: any[]) => {
        const { hour, minutes } = this.props
        return times.map((time: time) => {
            return (
                <div key={time.title} className='picker'>
                    <p className='title'>{time.title}</p>
                    <div className='values'>
                        {
                            time.values.map((value: number) => {
                                return (
                                    <button
                                        className={value === hour || value === minutes ? 'button-active' : ''}
                                        key={value}>{value % 12}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }


}


export default TimePicker
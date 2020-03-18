import React, { Component } from 'react'

interface timeValue {
    value: number
    text: string | number
}

interface time {
    title: string
    values: timeValue[]
}

type amPm = 'am' | 'pm'

interface IOwnProps {
    initialTime?: {
        hour: number
        minutes: number
    }
    hoursArray: number[]
    minutesArray: number[]
    mode12?: boolean
}

interface IState {
    hour: timeValue
    minutes: timeValue
    amPm?: amPm
    hoursPickerData?: time[]
    minutesPickerData?: time[]
    hoursOpen: boolean
    minutesOpen: boolean
}

class TimePicker extends Component<IOwnProps, IState>{
    public state: IState = {
        hour: { text: '', value: 0 },
        minutes: { text: '', value: 0 },
        amPm: undefined,
        hoursPickerData: undefined,
        minutesPickerData: undefined,
        hoursOpen: false,
        minutesOpen: false
    }

    public componentDidMount() {
        this.initialiseTime()
        this.generateHours()
        this.generateMinutes()
    }

    public render() {
        const { amPm, hour, minutes, hoursPickerData, minutesPickerData } = this.state
        console.log(hoursPickerData, '\n', minutesPickerData);

        return (
            <div className='container-timer'>
                <div className='clock'>
                    <button onClick={this.onHoursClick}>{hour.text}</button>
                    <span>:</span>
                    <button onClick={this.onMinutesClick}>{minutes.text}</button>
                    {amPm && <span>{amPm}</span>}
                </div>
                {/* <div className={`container-picker ${!hoursOpen && 'disp-none'}`}>
                    {this.renderHours()}
                </div>
                <div className={`container-picker ${!minutesOpen && 'disp-none'}`}>
                    {this.renderMinutes()}
                </div> */}
            </div>
        )
    }

    private initialiseTime = () => {
        const { initialTime } = this.props
        let hour
        let minutes
        if (!initialTime) {
            const now = new Date();
            hour = now.getHours()
            minutes = now.getMinutes()
        } else {
            hour = initialTime.hour
            minutes = initialTime.minutes
        }

        this.updateStateTime(hour, minutes)
    }

    private updateStateTime = (hour?: number, minutes?: number) => {
        const { mode12 } = this.props
        let stateHour = this.state.hour
        let amPm = this.state.amPm

        if (hour !== undefined && hour >= 0) {
            stateHour = this.generateTimeValue(hour)
            if (mode12) {
                amPm = hour < 12 ? 'am' : 'pm'
            }
        }

        const stateMinutes: timeValue = minutes !== undefined && minutes >= 0 ?
            this.generateTimeValue(minutes, true) : this.state.minutes

        this.setState({
            hour: stateHour,
            minutes: stateMinutes,
            amPm
        })
    }

    private transformHourText = (value: number, minutes?: boolean) => {
        const { mode12 } = this.props
        let newValue

        newValue = value === 0 ? '00' : `${value < 10 ? `0${value}` : value}`

        if (mode12 && !minutes) {
            if (value === 0 || value === 12) {
                newValue = '12'
            } else {
                const value12 = value % 12
                newValue = `${value12 < 10 ? `0${value12}` : value12}`
            }
        }
        return newValue
    }

    private generateTimeValue = (value: number, minutes?: boolean) => {
        return {
            value: value,
            text: this.transformHourText(value, minutes)
        }
    }

    private generateHours() {
        const { hoursArray, mode12 } = this.props
        let newHoursArray: time[] = []

        if (mode12) {
            let am: timeValue[] = []
            let pm: timeValue[] = []
            const titleAm = 'am'
            const titlePm = 'pm'
            hoursArray.map((v) => {
                if (v < 12) {
                    am.push(this.generateTimeValue(v))
                } else {
                    pm.push(this.generateTimeValue(v))
                }
            })
            newHoursArray = [
                {
                    title: titleAm,
                    values: am
                },
                {
                    title: titlePm,
                    values: pm
                }
            ]
        } else {
            const titleHours = 'hours'
            let timeValues: timeValue[] = []
            hoursArray.map((v) => {
                timeValues.push(this.generateTimeValue(v))
            })

            newHoursArray = [
                {
                    title: titleHours,
                    values: timeValues
                }
            ]

        }

        this.setState({ hoursPickerData: newHoursArray })
    }

    private generateMinutes = () => {
        const { minutesArray } = this.props
        let newMinutesArray: time[] = []
        let minuteValues: timeValue[] = []

        minutesArray?.map((v) => {
            minuteValues.push(this.generateTimeValue(v, true))
        })

        newMinutesArray = [
            {
                title: 'minutes',
                values: minuteValues
            }
        ]

        this.setState({ minutesPickerData: newMinutesArray })

    }



    // private renderHours = () => {
    //     return (
    //         <>
    //             {this.renderTimes(this.props.hoursArray)}
    //         </>
    //     )
    // }

    // private renderMinutes = () => {

    //     return (
    //         <>{this.renderTimes(this.props.minutesArray)}</>
    //     )
    // }

    // private renderTimes = (times: any[]) => {
    //     const { hour, minutes } = this.props
    //     return times.map((time: time) => {
    //         return (
    //             <div key={time.title} className='picker'>
    //                 <p className='title'>{time.title}</p>
    //                 <div className='values'>
    //                     {
    //                         time.values.map((i: any) => {
    //                             return (
    //                                 <button
    //                                     onClick={this.onValueClick}
    //                                     className={i.text === hour || i.text === minutes ? 'button-active' : ''}
    //                                     key={i.value}
    //                                     value={i.value}
    //                                 >
    //                                     {i.text}
    //                                 </button>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //             </div>
    //         )
    //     })
    // }

    private onHoursClick = () => {
        const hoursOpen: boolean = this.state.hoursOpen ? false : true
        this.setState({ hoursOpen, minutesOpen: false })
    }

    private onMinutesClick = () => {
        const minutesOpen: boolean = this.state.minutesOpen ? false : true
        this.setState({ minutesOpen, hoursOpen: false })
    }

    // private onValueClick = (e: any) => {
    //     const { hoursOpen, minutesOpen } = this.state
    //     if (hoursOpen) {
    //         this.props.updatePickUpHour(e.target.value)
    //         this.onHoursClick()
    //         this.onMinutesClick()
    //     } else if (minutesOpen) {
    //         this.props.updatePickUpMinutes(e.target.value)
    //         this.onMinutesClick()
    //     }

    // }

}


export default TimePicker
import React, { Component } from 'react'

interface time {
    title: string
    values: [
        {
            value:number
            text: string | number
        }
    ]
}

type amPm = 'am' | 'pm' | ''

interface IOwnProps {
    hour: number | string
    minutes: number | string
    amPm: amPm
    hoursArray: time[]
    minutesArray: time[]
    updatePickUpHour: (value:number) => void
    updatePickUpMinutes: (value:number) => void
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
        const {minutesOpen,hoursOpen} = this.state
        const { hour, amPm, minutes } = this.props

        return (
            <div className='container-timer'>
                <div className='clock'>
                    <button onClick={this.onHoursClick}>{hour}</button>
                    <span>:</span>
                    <button onClick={this.onMinutesClick}>{minutes}</button>
                    <span>{amPm}</span>
                </div>
                <div className={`container-picker ${!hoursOpen && 'disp-none'}`}>
                    {this.renderHours()}
                </div>
                <div className={`container-picker ${!minutesOpen && 'disp-none'}`}>
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
                            time.values.map((i: any) => {                                
                                return (
                                    <button
                                    onClick={this.onValueClick}
                                        className={i.text === hour || i.text === minutes ? 'button-active' : ''}
                                        key={i.value}
                                        value={i.value}
                                        >
                                            {i.text}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }

    private onHoursClick = ()=> {
        const hoursOpen:boolean = this.state.hoursOpen ? false : true
        this.setState({hoursOpen, minutesOpen:false})
    }

    private onMinutesClick = ()=> {
        const minutesOpen:boolean = this.state.minutesOpen ? false : true
        this.setState({minutesOpen, hoursOpen:false})
    }

    private onValueClick = (e:any) => {
        const {hoursOpen,minutesOpen} = this.state
        if(hoursOpen){
            this.props.updatePickUpHour(e.target.value)
            this.onHoursClick()
            this.onMinutesClick()
        } else if(minutesOpen){
            this.props.updatePickUpMinutes(e.target.value)
            this.onMinutesClick()
        }
        
    }

}


export default TimePicker
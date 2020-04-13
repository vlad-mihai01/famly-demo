import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router';

import ChildrenList from '../../components/ChildrenList'
import Loading from '../../components/Loading'

import { getChildren } from '../../api';
import { updateCurrentChild } from '../../actions'
import { routeListSignIn } from 'Routes';
import { TTheme } from '../../types/theme';

interface IState {
    sortedChildren?: any
}

interface IActionProps {
    updateCurrentChild: (payload: any) => void
}

type TProps = RouteComponentProps & IActionProps

class List extends Component<TProps, IState> {

    public state: IState = {
        sortedChildren: undefined,
    }


    public componentDidMount() {
        this.getChildrenList()
    }

    public componentDidUpdate(prevProps:TProps){
        if (prevProps.match.path !== this.props.match.path) {
            this.setState({sortedChildren:undefined})
            this.getChildrenList()
        }
    }


    public render() {        
        const { sortedChildren } = this.state
        const { match, updateCurrentChild } = this.props
        const listSignIn = match.path.includes(routeListSignIn) ? true : false
        
        const theme: TTheme = listSignIn ? 'light' : 'dark'
        


        if (!sortedChildren) {
            return (
                <div className='container-list'>
                    <div className='container-loading'>
                        <Loading theme={theme} />
                    </div>
                </div>
            )
        }

        if (!sortedChildren.length) {
            return (
                <div className='container-list'>
                    <div className={`list-empty ${theme}`}>Every one is in school</div>
                </div>
            )
        }

        return (
            <>
                <ChildrenList
                    theme={theme}
                    children={sortedChildren}
                    path={match.path}
                    updateCurrentChild={updateCurrentChild}
                />
            </>
        )
    }


    private getChildrenList = async () => {
        const res = await getChildren().catch(err => { console.error(err); })
        res && res.data && this.sortChildren(res.data.children)
    }

    private sortChildren = (children: []) => {
        const listSignIn = this.props.match.path.includes(routeListSignIn) ? true : false
        const sortedChildren: any = []
        children.map((child: any) => {
            if (listSignIn && !child.checkedIn) {
                sortedChildren.push(child)
            } else if (!listSignIn && child.checkedIn){
                sortedChildren.push(child)
            }
        })

        this.setState({ sortedChildren })
    }
}



const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateCurrentChild: (payload: any) => dispatch(updateCurrentChild(payload))
})

export default connect(null, mapDispatchToProps)(List)
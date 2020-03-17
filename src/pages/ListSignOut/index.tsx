import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'

import Loading from '../../components/Loading'
import ChildrenList from '../../components/ChildrenList'

import { getChildren } from '../../api'
import { updateCurrentChild } from '../../actions'


interface IState {
    sortedChildren?: any
}

interface IActionProps {
    updateCurrentChild: (payload: any) => void
}

type TProps = RouteComponentProps & IActionProps

class ListSignOut extends Component<TProps, IState> {

    public state: IState = {
        sortedChildren: undefined
    }

    public componentDidMount() {
        this.getChildrenList()
    }

    public render() {
        const { sortedChildren } = this.state
        const { match, updateCurrentChild } = this.props
        const theme = 'dark'

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
                    <div className='list-empty dark'>Every one is at home</div>
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
        const sortedChildren: any = []
        children.map((child: any) => {
            if (child.checkedIn) {
                sortedChildren.push(child)
            }
        })


        this.setState({ sortedChildren })


    }
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateCurrentChild: (payload: any) => dispatch(updateCurrentChild(payload))
})

export default connect(null, mapDispatchToProps)(ListSignOut)
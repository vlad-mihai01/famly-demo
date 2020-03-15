import React, { Component } from 'react'

import ChildrenList from '../../components/ChildrenList'
import Loading from '../../components/Loading'

import { getChildren } from '../../api';
import { RouteComponentProps } from 'react-router';

interface IState {
    sortedChildren?: any
}

class ListSignIn extends Component<RouteComponentProps, IState> {

    public state: IState = {
        sortedChildren: undefined
    }

    public componentDidMount() {
        this.getChildrenList()
    }

    public render() {

        const { sortedChildren } = this.state
        const theme = 'light'
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
                    <div className='list-empty light'>Every one is in school</div>
                </div>
            )
        }

        return (
            <>
                <ChildrenList theme={theme} children={sortedChildren} />
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
            if (!child.checkedIn) {
                sortedChildren.push(child)
            }
        })

        this.setState({ sortedChildren })
    }
}


export default ListSignIn
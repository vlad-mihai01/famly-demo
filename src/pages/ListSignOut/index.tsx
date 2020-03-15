import React, { Component } from 'react'

import { getChildren } from '../../api'
import ChildrenList from '../../components/ChildrenList'
import Loading from '../../components/Loading'

interface IState {
    sortedChildren?: any
}

class ListSignOut extends Component<{}, IState> {

    public state: IState = {
        sortedChildren: undefined
    }

    public componentDidMount() {
        this.getChildrenList()
    }

    public render() {
        const { sortedChildren } = this.state
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
        console.log(sortedChildren);


        if (!sortedChildren.length) {
            return (
                <div className='container-list'>
                    <div className='list-empty dark'>Every one is at home</div>
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
            if (child.checkedIn) {
                sortedChildren.push(child)
            }
        })


        this.setState({ sortedChildren })


    }
}


export default ListSignOut
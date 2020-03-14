import React,{Component} from 'react'

import {getChildren} from '../../api'
import ChildrenList from '../../components/ChildrenList'

interface IState {
    sortedChildren? : any 
}

class ListSignOut extends Component<{},IState> {

    public state:IState = {
        sortedChildren: undefined
    }

    public componentDidMount(){        
        this.getChildrenList()
    }

    public render(){
        const {sortedChildren} = this.state
        if(!sortedChildren){
            return(
                <div></div>
            )
        }

        return (
            <>
                <ChildrenList theme='dark' children={sortedChildren}/>
            </>
        )
    }

    private getChildrenList = async () => {        
        const res = await getChildren().catch(err => { console.error(err); })
        res && res.data && this.sortChildren(res.data.children)
    }

    private sortChildren = (children:[]) => {
        const sortedChildren:any = []
        children.map((child:any) => {
            if(!child.checkedIn && child.gender === 1){
                sortedChildren.push(child)
            }
        })


        this.setState({sortedChildren})
        
        
    }
}


export default ListSignOut
import React,{Component} from 'react'

import {getChildren} from '../../api'

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
        return(
            <div>List Sign Out</div>
        )
    }

    private getChildrenList = async () => {        
        const res = await getChildren().catch(err => { console.error(err); })
        res && res.data && this.sortChildren(res.data.children)
    }

    private sortChildren = (children:[]) => {
        const sortedChildren:any = []
        children.map((child:any) => {
            if(child.checkedIn){
                sortedChildren.push(child)
            }
        })

        console.log('SC', sortedChildren);

        this.setState({sortedChildren})
        
        
    }
}


export default ListSignOut
import React from 'react'

import browserHistory from '../../utils/history'

interface IOwnProps {
    child: any
    path: string
    updateCurrentChild: (payload: any) => void
}

const ChildCard: React.FunctionComponent<IOwnProps> = ({ child,path,updateCurrentChild }) => {

    const onChildClick = () =>{
        updateCurrentChild(child);
        browserHistory.push(`${path}/${child.childId}`)
    }
    
    return (
            <div key={child.childId} className='child-card' onClick={onChildClick}>
                <img src={child.image.large} alt="" />
                <p>{child.name.firstName}</p>
            </div>
    )
}

export default ChildCard
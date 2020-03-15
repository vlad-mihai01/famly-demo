import React from 'react'

interface IOwnProps {
    firstName: string
    imgUrl: string
    childId: string
}

const ChildCard:React.FunctionComponent<IOwnProps> = ({firstName,imgUrl,childId}) => {    
    return(
        <div key={childId} className='child-card'>
           <img src={imgUrl} alt=""/>
            <p>{firstName}</p>
        </div>
    )
}

export default ChildCard
import React from 'react'

interface IOwnProps {
    firstName: string
    imgUrl: string
}

const ChildCard:React.FunctionComponent<IOwnProps> = ({firstName,imgUrl}) => {    
    return(
        <div className='child-card'>
           <img src={imgUrl} alt=""/>
            <p>{firstName}</p>
        </div>
    )
}

export default ChildCard
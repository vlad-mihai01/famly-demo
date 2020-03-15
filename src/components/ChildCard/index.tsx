import React from 'react'
import { Link } from 'react-router-dom'

interface IOwnProps {
    firstName: string
    imgUrl: string
    childId: string
    path: string
}

const ChildCard: React.FunctionComponent<IOwnProps> = ({ firstName, imgUrl, childId,path }) => {
    return (
        <Link to={`${path}/${childId}`}>
            <div key={childId} className='child-card'>
                <img src={imgUrl} alt="" />
                <p>{firstName}</p>
            </div>
        </Link>
    )
}

export default ChildCard
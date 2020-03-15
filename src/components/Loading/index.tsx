import React from 'react'

interface IOwnProps {
    theme: 'light' | 'dark'
}

const Loading: React.FunctionComponent<IOwnProps> = ({theme}) => {
    return (
        <div className={`loading ${theme}`}></div>
    )
}

export default Loading
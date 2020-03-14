import React from 'react'

interface IOwnProps {
    theme : 'light' | 'dark'
}

const Loading: React.FunctionComponent<IOwnProps> = () => {
    return (
        <div>L</div>
    )
}

export default Loading
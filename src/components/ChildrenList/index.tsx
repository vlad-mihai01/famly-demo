import React from 'react'
import Swiper from 'react-id-swiper';

import ChildCard from '../../components/ChildCard'

import { createArrayWithSubarrays } from '../../utils/array';

interface IOwnProps {
    children: Array<any>
    theme: 'light' | 'dark'
    path: string
    updateCurrentChild: (payload: any) => void
}


type TProps = IOwnProps


const ChildrenList: React.FunctionComponent<TProps> = ({ children, theme, path, updateCurrentChild }) => {
    console.log('cl-theme',theme);
    
    const pages = () => {
        const pages = createArrayWithSubarrays(children, 10)
        return pages.map((page, index) => {
            return (
                <div key={index} className='swiper-page'>
                    <div className='sw-p-container'>
                        {page.map((child: any) => {
                            return (
                                <ChildCard
                                    key={child.childId}
                                    path={path}
                                    child={child}
                                    updateCurrentChild={updateCurrentChild}
                                />
                            )
                        })}
                    </div>
                </div>
            )

        })
    }


    const swipeParams = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index: number, className: string) {
                console.log('bullet');
                
                return `<span class='${theme} ${className}'> </span>`
            }
        }
    }
    return (

        <Swiper {...swipeParams}>
            {pages()}
        </Swiper>

    )
}

export default ChildrenList
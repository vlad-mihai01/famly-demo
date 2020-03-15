import React from 'react'
import Swiper from 'react-id-swiper';

import ChildCard from '../../components/ChildCard'

import { createArrayWithSubarrays } from '../../utils/array';

interface IOwnProps {
    children: Array<any>
    theme: 'light' | 'dark'
    path: string
}


type TProps = IOwnProps


const ChildrenList: React.FunctionComponent<TProps> = ({ children, theme, path }) => {

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
                                    firstName={child.name.firstName}
                                    imgUrl={child.image.large}
                                    childId={child.childId}
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
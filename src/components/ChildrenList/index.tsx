import React from 'react'
import Swiper from 'react-id-swiper';

import ChildCard from '../../components/ChildCard'

import { createArrayWithSubarrays } from '../../utils/array';

interface IOwnProps {
    children: Array<any>
}


type TProps = IOwnProps


const ChildrenList: React.FunctionComponent<TProps> = ({ children }) => {

    const pages = () => {
        const pages = createArrayWithSubarrays(children, 10)
        return pages.map((page) => {
            return (
                <div>
                    {page.map((child: any) => {
                        return (
                            <ChildCard firstName={child.name.firstName} imgUrl={child.image.large}/>
                        )
                    })}
                </div>
            )

        })
    }

    const swipeParams = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    }
    return (
        <div className='test'>
            <Swiper {...swipeParams}>
                {pages()}
            </Swiper>
        </div>
    )
}

export default ChildrenList
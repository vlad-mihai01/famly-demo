import React from 'react'
import Swiper from 'react-id-swiper';

interface IOwnProps {
    children: Array<any>
}


type TProps = IOwnProps


const ChildrenList: React.FunctionComponent<TProps> = ({ children }) => {

    const createPaginationArray = (array: any, itemsNumber: any) => {
        const newArray: any[] = []
        let arrayCount = 0
        do {
            let count = 0
            let pageArray = []
            while (count <= itemsNumber - 1) {
                if (array[arrayCount]) {
                    pageArray.push(array[arrayCount])
                }
                arrayCount++
                count++
            }
            if (count === itemsNumber) {
                newArray.push(pageArray)
            }

        } while (arrayCount <= array.length - 1);
        return newArray
    }

    const pages = () => {
        const pages = createPaginationArray(children, 10)
        return pages.map((page)=>{
            return(
                <div>
                    {page.map((child:any)=>{
                        return(
                            <div>
                                <p onClick={()=>{console.log(child.name);
                                }}>{child.name.firstName}</p>
                            </div>
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
        <div>
            <Swiper {...swipeParams}>
                {pages()}
            </Swiper>
        </div>
    )
}

export default ChildrenList
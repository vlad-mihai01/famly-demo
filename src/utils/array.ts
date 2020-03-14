export function createArrayWithSubarrays (array: any, itemsNumber: any){
    const newArray: any[] = []
    let arrayCount = 0
    do {
        let pageArray = []
        for (let count = 0; count < itemsNumber; count++) {
            if (array[arrayCount]) {
                pageArray.push(array[arrayCount])
            }
            arrayCount++
        }
        newArray.push(pageArray)

    } while (arrayCount < array.length);
    return newArray
}
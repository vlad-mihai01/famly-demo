export const UPDATE_CURRENT_CHILD = 'UPDATE_CURRENT_CHILD'

export const updateCurrentChild = (payload:any) => {
    return{
        type: UPDATE_CURRENT_CHILD,
        payload
    }
}
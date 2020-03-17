import {UPDATE_CURRENT_CHILD} from '../actions'

const reducerCurrentChild = (state:any = null, action:any) => {
    switch (action.type) {
        case UPDATE_CURRENT_CHILD:
            return action.payload;
            break;
    
        default:
            return state;
    }
}

export default reducerCurrentChild
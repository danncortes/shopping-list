import { PRODUCT_TO_EDIT, REMOVE_PRODUCT_TO_EDIT } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case PRODUCT_TO_EDIT:
            state = action.payload
            return state;  
        case REMOVE_PRODUCT_TO_EDIT:
            state = {}
            return state;  
        default:
            return state;
    }
}
         
import {ADD_PRODUCT_TO_LIST} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_LIST:
            state = [...state, action.payload]
            return state;
        default:
            return state;
    }
}
import {ADD_PRODUCT_TO_LIST} from '../actions';
import {CLEAR_LIST} from '../actions';

export default function(state = {products:[], total: 0}, action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_LIST:
            state = {
                products: [...state.products, action.payload.product],
                total: state.total + action.payload.subTotal
            }
            return state;
        case CLEAR_LIST:
            return action.payload;
        default:
            return state;
    }
}
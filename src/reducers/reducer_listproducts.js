import {ADD_PRODUCT_TO_LIST, CLEAR_LIST, REMOVE_PRODUCT_FROM_LIST} from '../actions';

export default function(state = {products:[], total: 0}, action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_LIST:
            state = {
                products: [...state.products, action.payload.product],
                total: state.total + action.payload.subTotal
            }
            return state;
        case REMOVE_PRODUCT_FROM_LIST:
            var products = state.products.filter((item)=>{
                return item.id !== action.payload.product.id;
            })
            state = {
                products: products,
                total: state.total - action.payload.subTotal
            }
            return state;
        case CLEAR_LIST:
            return action.payload;
        default:
            return state;
    }
}
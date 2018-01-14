import {ADD_PRODUCT_TO_LIST, CLEAR_LIST, REMOVE_PRODUCT_FROM_LIST, EDIT_PRODUCT_ON_LIST} from '../actions';

export default function(state = {products:[], total: 0, id: ''}, action) {
    switch (action.type) {
        case ADD_PRODUCT_TO_LIST:
            state = {
                products: [...state.products, ...action.payload.products],
                total: state.total + action.payload.subTotal,
                id: action.payload.id
            }
            return state;

        case EDIT_PRODUCT_ON_LIST:
            var products = state.products.map((item)=>{
                if(item.id === action.payload.product.id){
                    item.quant += action.payload.product.quant;
                }
                return item
            })
            state = {
                products: [...products],
                total: state.total + action.payload.subTotal,
                id: state.id
            }
            return state;

        case REMOVE_PRODUCT_FROM_LIST:
            var products = state.products.filter((item)=>{
                return item.id !== action.payload.product.id;
            })
            state = {
                products: products,
                total: state.total - action.payload.subTotal,
                id: state.id
            }
            return state;
            
        case CLEAR_LIST:
            return action.payload;
        default:
            return state;
    }
}
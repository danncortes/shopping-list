import {
    ADD_PRODUCT_TO_CURRENT_LIST,
    EDIT_PRODUCT_ON_CURRENT_LIST,
    CLEAR_CURRENT_LIST,
    REMOVE_PRODUCT_FROM_CURRENT_LIST,
} from '../actions/current-list';

export default function (state = {
    products: [],
    total: 0,
    id: '',
    purchased: false,
}, action) {
    switch (action.type) {
    case ADD_PRODUCT_TO_CURRENT_LIST:
        state = {
            products: [...state.products, ...action.payload.products],
            total: state.total + action.payload.subTotal,
            id: action.payload.id,
            purchased: action.payload.purchased,
        };
        return state;

    case EDIT_PRODUCT_ON_CURRENT_LIST:
        var products = state.products.map((item) => {
            if (item.id === action.payload.product.id) {
                item.subTotal += action.payload.product.subTotal;
                item.quant += action.payload.product.quant;
            }
            return item;
        });
        state = {
            products: [...products],
            total: state.total + action.payload.subTotal,
            id: state.id,
        };
        return state;

    case REMOVE_PRODUCT_FROM_CURRENT_LIST:
        var products = state.products.filter(item => item.id !== action.payload.product.id);
        state = {
            products,
            total: state.total - action.payload.subTotal,
            id: state.id,
        };
        return state;

    case CLEAR_CURRENT_LIST:
        return action.payload;
    default:
        return state;
    }
}

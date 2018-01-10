import { FETCH_PRODUCTS, DELETE_PRODUCT, CREATE_PRODUCT } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data;

        case CREATE_PRODUCT:
            state = [...state, action.payload.data]
            return state;

        case DELETE_PRODUCT:
            state = state.filter(item => {
                return item.id !== action.payload
            });
            return state;
            
        default:
            return state;
    }
}
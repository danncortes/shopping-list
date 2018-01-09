import { FETCH_PRODUCTS } from '../actions';
import { FETCH_LISTS } from '../actions';
import { DELETE_PRODUCT } from '../actions';
import { CREATE_PRODUCT } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data;
        case FETCH_LISTS:
            return action.payload.data;
        case DELETE_PRODUCT:
            state = state.filter(item => {
                return item.id !== action.payload
            });
            return state;
        case CREATE_PRODUCT:
            state = [...state, action.payload.data]
            return state;
        default:
            return state;
    }
}
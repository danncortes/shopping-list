import { FETCH_LISTS, SAVE_LIST, DELETE_LIST, PURCHASE_LIST, UPDATE_LIST } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_LISTS:
            return action.payload.data;
            
        case SAVE_LIST:
            state = [...state, action.payload.data];
            return state;

        case UPDATE_LIST:
            state = state.filter(item => {
                return item.id !== action.payload.data.id
            });
            state = [...state, action.payload.data]
            return state;

        case PURCHASE_LIST:
            state = state.filter(item => {
                return item.id !== action.payload.data.id
            });
            state = [...state, action.payload.data]
            return state;

        case DELETE_LIST:
            state = state.filter(item => {
                return item.id !== action.payload
            });
            return state;
            
        default:
            return state;
    }
}
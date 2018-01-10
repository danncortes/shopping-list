import { FETCH_LISTS, SAVE_LIST } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_LISTS:
            return action.payload.data
        case SAVE_LIST:
        console.log(action)
            state = [...state, action.payload.data];
            return state;
        default:
            return state;
    }
}
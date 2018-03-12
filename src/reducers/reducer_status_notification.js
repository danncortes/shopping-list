import { STATUS_NOTIFICATION } from '../actions/index';

export default function (state = {
    active: false,
    mode: '',
    message: '',
}, action) {
    switch (action.type) {
    case STATUS_NOTIFICATION:
        state = { ...state, ...action.data };
        return state;
    default:
        return state;
    }
}


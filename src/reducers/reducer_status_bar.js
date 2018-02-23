export default function (state = {
    active: false,
    mode: '',
    message: '',
}, action) {
    switch (action.type) {
    case 'STATUS_BAR':
        state = { ...state, ...action.data };
        return state;
    default:
        return state;
    }
}


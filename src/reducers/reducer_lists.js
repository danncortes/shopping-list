import {
    FETCH_LISTS_SUCCESS,
    FETCH_LISTS_LOADING,
    FETCH_LISTS_ERROR,
    DELETE_LIST_SUCCESS,
    CREATE_LIST_SUCCESS,
    UPDATE_LIST_SUCCESS,
} from '../actions/lists';

export default function (state = {
    data: [],
    status: {
        inProgress: false,
        hasError: false,
    },
}, action) {
    switch (action.type) {
    case FETCH_LISTS_SUCCESS:
        const lists = action.data.data.map(product => (
            {
                ...product,
                isOnEdit: false,
                isSelected: false,
            }
        ));
        state = { ...state, data: [...lists] };
        return state;

    case FETCH_LISTS_LOADING:
        state = { ...state };
        state.status.inProgress = action.inProgress;
        return state;

    case FETCH_LISTS_ERROR:
        state = { ...state };
        state.status.hasError = action.hasError;
        return state;

    case DELETE_LIST_SUCCESS:
        state = { ...state };
        state.data = state.data.filter(item => item.id !== action.data);
        return state;

    case CREATE_LIST_SUCCESS:
        state = { ...state, data: [...state.data, action.data.data] };
        return state;

    case UPDATE_LIST_SUCCESS:
        const lists_updated = state.data.filter(item => item.id !== action.data.data.id);
        const updated_list = {
            ...action.data.data,
            isOnEdit: false,
            isSelected: false,
        };
        state = { ...state, data: [...lists_updated, updated_list] };
        return state;
    default:
        return state;
    }
}

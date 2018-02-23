import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_LOADING,
    FETCH_PRODUCTS_ERROR,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_LOADING,
    DELETE_PRODUCT_ERROR,
} from '../actions/products';

export default function (state = {
    data: [],
    status: {
        fetch: {
            inProgress: false,
            hasError: false,
        },
    },
}, action) {
    switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
        state = { ...state, data: [...action.data.data] };
        return state;

    case FETCH_PRODUCTS_LOADING:
        state = { ...state };
        state.status.fetch.inProgress = action.inProgress;
        return state;

    case FETCH_PRODUCTS_ERROR:
        state = { ...state };
        state.status.fetch.hasError = action.hasError;
        return state;

    case DELETE_PRODUCT_SUCCESS:
        state = { ...state };
        state.data = state.data.filter(item => item.id !== action.data);
        return state;
    // case CREATE_PRODUCT:
    //     state = [...state, action.payload.data];
    //     return state;

    // case EDIT_PRODUCT:
    //     state = state.filter(item => item.id !== action.payload.data.id);
    //     state = [...state, action.payload.data];
    //     return state;
    default:
        return state;
    }
}

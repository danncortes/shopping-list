import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_LOADING,
    FETCH_PRODUCTS_ERROR,
    DELETE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    PRODUCT_TO_EDIT,
    REMOVE_PRODUCT_TO_EDIT,
    UPDATE_PRODUCT_SUCCESS,
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
        const products = action.data.data.map(product => (
            {
                ...product,
                isOnEdit: false,
                isSelected: false,
            }
        ));
        state = { ...state, data: [...products] };
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

    case CREATE_PRODUCT_SUCCESS:
        state = { ...state, data: [...state.data, action.data.data] };
        return state;

    case PRODUCT_TO_EDIT:
        const products_with_edit = state.data.map((product) => {
            product.isOnEdit = product.id === action.payload;
            return product;
        });
        state = { ...state, data: [...products_with_edit] };
        return state;

    case REMOVE_PRODUCT_TO_EDIT:
        const products_without_edit = state.data.map((product) => {
            product.isOnEdit = false;
            return product;
        });
        state = { ...state, data: [...products_without_edit] };
        return state;
    case UPDATE_PRODUCT_SUCCESS:
        const products_updated = state.data.filter(item => item.id !== action.data.data.id);
        const updated_product = {
            ...action.data.data,
            isOnEdit: false,
            isSelected: false,
        };
        state = { ...state, data: [...products_updated, updated_product] };
        return state;
    default:
        return state;
    }
}

import axios from 'axios';
import { setFetchStatus, fetchDataNotificationStatus } from './utils-action';
import ROOT_URL from './root-url';

export const ADD_PRODUCT_TO_CURRENT_LIST = 'ADD_PRODUCT_TO_CURRENT_LIST';
export const EDIT_PRODUCT_ON_CURRENT_LIST = 'EDIT_PRODUCT_ON_CURRENT_LIST';
export const CLEAR_CURRENT_LIST = 'CLEAR_CURRENT_LIST';
export const REMOVE_PRODUCT_FROM_CURRENT_LIST = 'REMOVE_PRODUCT_FROM_CURRENT_LIST';


export function addProductToListAction(products, subTotal, id, purchased = false) {
    return {
        type: ADD_PRODUCT_TO_CURRENT_LIST,
        payload: {
            products, subTotal, id, purchased,
        },
    };
}

export function editProductOnListAction(product) {
    return {
        type: EDIT_PRODUCT_ON_CURRENT_LIST,
        payload: { product, subTotal: product.subTotal },
    };
}

export function clearCurrentListAction() {
    return {
        type: CLEAR_CURRENT_LIST,
        payload: { products: [], total: 0, id: '' },
    };
}

export function removeFromCurrentListAction(product) {
    return {
        type: REMOVE_PRODUCT_FROM_CURRENT_LIST,
        payload: { product, subTotal: product.subTotal },
    };
}

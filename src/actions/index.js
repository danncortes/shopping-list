import axios from 'axios';
import ROOT_URL from './root-url';

export const STATUS_NOTIFICATION = 'STATUS_NOTIFICATION';
export const PRODUCT_TO_EDIT = 'PRODUCT_TO_EDIT';
export const REMOVE_PRODUCT_TO_EDIT = 'REMOVE_PRODUCT_TO_EDIT';
export const FETCH_LISTS = 'FETCH_LISTS';
export const SAVE_LIST = 'SAVE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const PURCHASE_LIST = 'PURCHASE_LIST';
export const ADD_PRODUCT_TO_LIST = 'ADD_PRODUCT_TO_LIST';
export const REMOVE_PRODUCT_FROM_LIST = 'REMOVE_PRODUCT_FROM_LIST';
export const EDIT_PRODUCT_ON_LIST = 'EDIT_PRODUCT_ON_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';

export function pickProductToEdit(product) {
    return {
        type: PRODUCT_TO_EDIT,
        payload: product,
    };
}

export function removeProductToEdit() {
    return {
        type: REMOVE_PRODUCT_TO_EDIT,
        payload: {},
    };
}

/** * LISTS ** */
export function fetchLists() {
    const request = axios.get(`${ROOT_URL}/lists`);

    return {
        type: FETCH_LISTS,
        payload: request,
    };
}

export function saveList(list) {
    const request = axios.post(`${ROOT_URL}/lists`, list);

    return {
        type: SAVE_LIST,
        payload: request,
    };
}


export function deleteList(list) {
    const request = axios.delete(`${ROOT_URL}/lists/${list.id}`);

    return {
        type: DELETE_LIST,
        payload: list.id,
    };
}

export function editList(list) {
    return {
        type: EDIT_LIST,
        payload: list,
    };
}

export function updateList(list, id) {
    const request = axios.put(`${ROOT_URL}/lists/${id}`, list);
    return {
        type: UPDATE_LIST,
        payload: request,
    };
}

export function purchaseList(list) {
    const request = axios.put(`${ROOT_URL}/lists/${list.id}`, list);

    return {
        type: PURCHASE_LIST,
        payload: request,
    };
}

export function clearList() {
    return {
        type: CLEAR_LIST,
        payload: { products: [], total: 0, id: '' },
    };
}

/** * SELECTED PRODUCTS ** */
export function addProductToList(products, subTotal, id) {
    return {
        type: ADD_PRODUCT_TO_LIST,
        payload: { products, subTotal, id },
    };
}

export function removeProductFromList(product) {
    return {
        type: REMOVE_PRODUCT_FROM_LIST,
        payload: { product, subTotal: product.subTotal },
    };
}

export function editProductOnList(product) {
    return {
        type: EDIT_PRODUCT_ON_LIST,
        payload: { product, subTotal: product.subTotal },
    };
}

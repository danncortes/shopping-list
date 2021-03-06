import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const PRODUCT_TO_EDIT = 'PRODUCT_TO_EDIT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const REMOVE_PRODUCT_TO_EDIT = 'REMOVE_PRODUCT_TO_EDIT';
export const FETCH_LISTS = 'FETCH_LISTS';
export const SAVE_LIST = 'SAVE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const PURCHASE_LIST = 'PURCHASE_LIST'
export const ADD_PRODUCT_TO_LIST = 'ADD_PRODUCT_TO_LIST';
export const REMOVE_PRODUCT_FROM_LIST = 'REMOVE_PRODUCT_FROM_LIST';
export const EDIT_PRODUCT_ON_LIST = 'EDIT_PRODUCT_ON_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';

const ROOT_URL = 'http://localhost:3001';

/*** PRODUCTS ***/
export function fetchProducts() {
    const request = axios.get(`${ROOT_URL}/products`);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    }

}

export function deleteProduct(id) {
    const request = axios.delete(`${ROOT_URL}/products/${id}`);

    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}

export function createProduct(product) {
    const request = axios.post(`${ROOT_URL}/products`, product);

    return {
        type: CREATE_PRODUCT,
        payload: request
    }
}

export function editProduct(id, product) {
    const request = axios.put(`${ROOT_URL}/products/${id}`, product);
    return {
        type: EDIT_PRODUCT,
        payload: request
    }
}

export function pickProductToEdit(product) {
    return {
        type: PRODUCT_TO_EDIT,
        payload: product
    }
}

export function removeProductToEdit() {
    return {
        type: REMOVE_PRODUCT_TO_EDIT,
        payload: {}
    }
}

/*** LISTS ***/
export function fetchLists() {
    const request = axios.get(`${ROOT_URL}/lists`);

    return {
        type: FETCH_LISTS,
        payload: request
    }
}

export function saveList(list) {
    const request = axios.post(`${ROOT_URL}/lists`, list);

    return {
        type: SAVE_LIST,
        payload: request
    }
}


export function deleteList(list) {
    const request = axios.delete(`${ROOT_URL}/lists/${list.id}`);

    return {
        type: DELETE_LIST,
        payload: list.id
    }
}

export function editList(list) {

    return {
        type: EDIT_LIST,
        payload: list
    }
}

export function updateList(list, id) {
    const request = axios.put(`${ROOT_URL}/lists/${id}`, list);
    return {
        type: UPDATE_LIST,
        payload: request
    }
}

export function purchaseList(list) {
    const request = axios.put(`${ROOT_URL}/lists/${list.id}`, list);

    return {
        type: PURCHASE_LIST,
        payload: request
    }
}

export function clearList() {
    return {
        type: CLEAR_LIST,
        payload: { products: [], total: 0, id: '' }
    }
}

/*** SELECTED PRODUCTS ***/
export function addProductToList(products, subTotal, id) {
    return {
        type: ADD_PRODUCT_TO_LIST,
        payload: { products, subTotal, id }
    }
}

export function removeProductFromList(product) {
    return {
        type: REMOVE_PRODUCT_FROM_LIST,
        payload: { product, subTotal: product.subTotal }
    }
}

export function editProductOnList(product) {
    return {
        type: EDIT_PRODUCT_ON_LIST,
        payload: { product, subTotal: product.subTotal }
    }
}
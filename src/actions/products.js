import axios from 'axios';
import { displayStatus, fetchDataSuccess, fetchAreLoading, fetchHaveError, launchStatusBar } from './utils-action';
import ROOT_URL from './root-url';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_LOADING = 'FETCH_PRODUCTS_LOADING';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_LOADING = 'DELETE_PRODUCT_LOADING';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_LOADING = 'CREATE_PRODUCT_LOADING';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_LOADING = 'EDIT_PRODUCT_LOADING';
export const EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR';

export const STATUS_BAR = 'STATUS_BAR';

export function fetchProducts() {
    const request = axios.get(`${ROOT_URL}/products`);
    return displayStatus(request, false, false, '', FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_LOADING, FETCH_PRODUCTS_ERROR);
}

export function deleteProduct(id) {
    const request = axios.delete(`${ROOT_URL}/products/${id}`);
    return displayStatus(request, id, STATUS_BAR, 'Delete', DELETE_PRODUCT_SUCCESS);
}

export function createProduct(product) {
    const request = axios.post(`${ROOT_URL}/products`, product);
    // return fetchData(request, CREATE_PRODUCT_ERROR, CREATE_PRODUCT_LOADING, CREATE_PRODUCT_SUCCESS);
}

export function editProduct(id, product) {
    const request = axios.put(`${ROOT_URL}/products/${id}`, product);
    // return fetchData(request, EDIT_PRODUCT_ERROR, EDIT_PRODUCT_LOADING, EDIT_PRODUCT_SUCCESS);
}

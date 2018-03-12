import axios from 'axios';
import { setFetchStatus, fetchDataNotificationStatus } from './utils-action';
import ROOT_URL from './root-url';
import { STATUS_NOTIFICATION } from './index';
import getProducts from '../services/product-service';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_LOADING = 'FETCH_PRODUCTS_LOADING';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';

export function fetchProducts() {
    const request = getProducts();
    return setFetchStatus(request, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_LOADING, FETCH_PRODUCTS_ERROR);
}

export function deleteProduct(id) {
    const request = axios.delete(`${ROOT_URL}/products/${id}`);
    return fetchDataNotificationStatus(request, id, STATUS_NOTIFICATION, 'Delete', DELETE_PRODUCT_SUCCESS);
}

export function createProduct(product) {
    const request = axios.post(`${ROOT_URL}/products`, product);
    return fetchDataNotificationStatus(request, false, STATUS_NOTIFICATION, 'Create', CREATE_PRODUCT_SUCCESS);
}

export function editProduct(id, product) {
    const request = axios.put(`${ROOT_URL}/products/${id}`, product);
    // return fetchData(request, EDIT_PRODUCT_ERROR, EDIT_PRODUCT_LOADING, EDIT_PRODUCT_SUCCESS);
}

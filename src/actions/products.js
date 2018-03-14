import axios from 'axios';
import { setFetchStatus, fetchDataNotificationStatus } from './utils-action';
import ROOT_URL from './root-url';
import { STATUS_NOTIFICATION } from './index';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/product-service';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_LOADING = 'FETCH_PRODUCTS_LOADING';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';

export const PRODUCT_TO_EDIT = 'PRODUCT_TO_EDIT';
export const REMOVE_PRODUCT_TO_EDIT = 'REMOVE_PRODUCT_TO_EDIT';

export function fetchProductsAction() {
    const request = getProducts();
    return setFetchStatus(request, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_LOADING, FETCH_PRODUCTS_ERROR);
}

export function deleteProductAction(id) {
    const request = deleteProduct(id);
    return fetchDataNotificationStatus(request, id, STATUS_NOTIFICATION, 'Delete', DELETE_PRODUCT_SUCCESS);
}

export function createProductAction(product) {
    const request = createProduct(product);
    return fetchDataNotificationStatus(request, false, STATUS_NOTIFICATION, 'Create', CREATE_PRODUCT_SUCCESS);
}

export function selectProductToEditAction(id) {
    return {
        type: PRODUCT_TO_EDIT,
        payload: id,
    };
}

export function removeProductToEditAction() {
    return {
        type: REMOVE_PRODUCT_TO_EDIT,
        payload: {},
    };
}

export function editProductAction(id, product) {
    const request = updateProduct(id, product);
    return fetchDataNotificationStatus(request, false, STATUS_NOTIFICATION, 'Update', UPDATE_PRODUCT_SUCCESS);
}

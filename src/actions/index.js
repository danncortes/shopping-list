import axios from 'axios';
import { values } from 'redux-form';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_LISTS = 'FETCH_LISTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const ADD_PRODUCT_TO_LIST = 'ADD_PRODUCT_TO_LIST';

const ROOT_URL = 'http://localhost:3001';

export function fetchProducts(){
    const request = axios.get(`${ROOT_URL}/products`);
    
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}

export function fetchLists(){
    const request = axios.get(`${ROOT_URL}/lists`);

    return {
        type: FETCH_LISTS,
        payload: request
    }
}

export function deleteProduct(id){
    const request = axios.delete(`${ROOT_URL}/products/${id}`);

    return{
        type: DELETE_PRODUCT,
        payload: id
    }
}

export function createProduct(data){
    const request = axios.post(`${ROOT_URL}/products`, data);

    return{
        type: CREATE_PRODUCT,
        payload: request
    }
}

export function addProductToList(product){
    return {
        type: ADD_PRODUCT_TO_LIST,
        payload: product
    }
}
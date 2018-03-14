import axios from 'axios';
import ROOT_URL from '../actions/root-url';

export function getProducts() {
    return axios.get(`${ROOT_URL}/products`)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}

export function deleteProduct(id) {
    return axios.delete(`${ROOT_URL}/products/${id}`)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}

export function createProduct(product) {
    return axios.post(`${ROOT_URL}/products`, product)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}

export function updateProduct(id, product) {
    return axios.put(`${ROOT_URL}/products/${id}`, product)
        .then(response => response)
        .catch((error) => {
            throw Error(error);
        });
}

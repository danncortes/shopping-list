import axios from 'axios';
import ROOT_URL from '../actions/root-url';

export function getLists() {
    return axios.get(`${ROOT_URL}/lists`)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}

export function deleteList(id) {
    return axios.delete(`${ROOT_URL}/lists/${id}`)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}

export function updateList(id, list) {
    return axios.put(`${ROOT_URL}/lists/${id}`, list)
        .then(response => response)
        .catch((error) => { throw Error(error); });
}


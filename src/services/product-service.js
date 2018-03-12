import axios from 'axios';
import ROOT_URL from '../actions/root-url';

export default function getProducts() {
    return axios.get(`${ROOT_URL}/products`)
        .then(response => response)
        .catch((error) => { console.log(error.message); });
}

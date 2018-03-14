import axios from 'axios';
import { setFetchStatus, fetchDataNotificationStatus } from './utils-action';
import ROOT_URL from './root-url';
import { STATUS_NOTIFICATION } from './index';

export const ADD_PRODUCT_TO_LIST = 'ADD_PRODUCT_TO_LIST';

export function addProductToListAction(products, subTotal, id) {
    return {
        type: ADD_PRODUCT_TO_LIST,
        payload: { products, subTotal, id },
    };
}

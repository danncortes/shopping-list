import axios from 'axios';
import ROOT_URL from './root-url';
import { STATUS_NOTIFICATION } from './index';
import { setFetchStatus, fetchDataNotificationStatus } from './utils-action';
import { getLists, deleteList, updateList, postList } from '../services/list-service';

export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_LOADING = 'FETCH_LISTS_LOADING';
export const FETCH_LISTS_ERROR = 'FETCH_LISTS_ERROR';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';

export function fetchListsAction() {
    const request = getLists();
    return setFetchStatus(request, FETCH_LISTS_SUCCESS, FETCH_LISTS_LOADING, FETCH_LISTS_ERROR);
}

export function deleteListAction(id) {
    const request = deleteList(id);
    return fetchDataNotificationStatus(request, id, STATUS_NOTIFICATION, 'Delete', DELETE_LIST_SUCCESS);
}

export function updateListAction(id, list) {
    const request = updateList(id, list);
    return fetchDataNotificationStatus(request, false, STATUS_NOTIFICATION, 'Update', UPDATE_LIST_SUCCESS);
}

export function createListAction(list) {
    const request = postList(list);
    return fetchDataNotificationStatus(request, false, STATUS_NOTIFICATION, 'Create', CREATE_LIST_SUCCESS);
}

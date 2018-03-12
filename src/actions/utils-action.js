import { setTimeout } from 'timers';

export function fetchAreLoading(type, bool) {
    return {
        type,
        inProgress: bool,
    };
}

export function fetchHaveError(type, bool) {
    return {
        type,
        hasError: bool,
    };
}

export function fetchDataSuccess(type, data) {
    return {
        type,
        data,
    };
}

export function launchStatus(type, data) {
    return {
        type,
        data,
    };
}

export function setFetchStatus(request, success, loading, error) {
    return (dispatch) => {
        dispatch(fetchAreLoading(loading, true));
        request.then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(fetchAreLoading(loading, false));
            return response;
        }).then((response) => {
            dispatch(fetchDataSuccess(success, response));
        }).catch(() => {
            dispatch(fetchHaveError(error, true));
        });
    };
}

export function fetchDataNotificationStatus(request, isDelete, statusBar, process, success) {
    return (dispatch) => {
        dispatch(launchStatus(statusBar, {
            active: true,
            mode: 'info',
            message: `${process} in progress...`,
        }));

        request.then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            return response;
        }).then((response) => {
            if (isDelete) {
                dispatch(fetchDataSuccess(success, isDelete));
            }
            dispatch(fetchDataSuccess(success, response));
            dispatch(launchStatus(statusBar, {
                active: true,
                mode: 'success',
                message: `${process} Successfull!.`,
            }));
        }).catch(() => {
            dispatch(launchStatus(statusBar, {
                active: true,
                mode: 'error',
                message: `Error on ${process}`,
            }));
        }).then(() => {
            setTimeout(() => {
                dispatch(launchStatus(statusBar, {
                    active: false,
                    mode: '',
                    message: '',
                }));
            }, 2000);
        });
    };
}

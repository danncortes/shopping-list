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

export function launchStatusBar(type, data) {
    return {
        type,
        data,
    };
}

export function displayStatus(request, isDelete, statusBar, process, success = false, loading = false, error = false) {
    if (statusBar) {
        return (dispatch) => {
            dispatch(launchStatusBar(statusBar, {
                active: true,
                mode: 'info',
                message: `${process} in progress...`,
            }));

            request.then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(launchStatusBar(statusBar, {
                    active: true,
                    mode: 'error',
                    message: response.statusText,
                }));
                return response;
            })
                .then((response) => {
                    if (isDelete) {
                        dispatch(fetchDataSuccess(success, isDelete));
                    }
                    dispatch(fetchDataSuccess(success, response));
                    dispatch(launchStatusBar(statusBar, {
                        active: true,
                        mode: 'success',
                        message: `${process} Successfull!.`,
                    }));
                })
                .catch(() => {
                    dispatch(launchStatusBar(statusBar, {
                        active: true,
                        mode: 'error',
                        message: 'Error',
                    }));
                });
        };
    }
    return (dispatch) => {
        dispatch(fetchAreLoading(loading, true));

        request.then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(fetchAreLoading(loading, false));
            return response;
        }).then((response) => {
            if (isDelete) {
                dispatch(fetchDataSuccess(success, isDelete));
            }
            dispatch(fetchDataSuccess(success, response));
        })
            .catch(() => {
                dispatch(fetchHaveError(error, true));
            });
    };
}

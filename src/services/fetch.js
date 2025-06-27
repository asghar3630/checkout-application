import { SERVICE_URL } from './../constants';
import store from '../store';
import { actionTypes } from '../store/reducers/authRedux';
import { openSnackbar } from 'store/reducers/snackbar';
import { CLEAR_MENU } from 'store/actions';
// import { changeRoute } from "./Utilities";

const refreshTokenRequest = async (requestBody) => {
    // const response = await simpleFetch(`${SERVICE_URL}/oauth/token`, {
    //     method: 'POST'
    //     // body: JSON.stringify(requestBody)
    // });
    const formData = new FormData();
    formData.append('refresh_token', requestBody.refreshToken);
    formData.append('grant_type', 'refresh_token');
    const response = await fetch(`${SERVICE_URL}/oauth/token`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const errorMessage = { status: 'ERROR' };
    if (response.status !== 200) {
        throw new Error(JSON.stringify({ ...errorMessage }));
    }

    try {
        return await response.json();
    } catch (e) {
        throw new Error(JSON.stringify({ ...errorMessage, data: e }));
    }
};

const authenticatedFetch = async (url, data = {}, handleServerErrors = true) => {
    const {
        auth: { token, refreshToken }
    } = store.getState();
    let response = await fetch(url, {
        ...data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    // Handle only 401 here...
    // UN_AUTHORIZED
    if (response.status === 401) {
        try {
            let res = await refreshTokenRequest({ refreshToken: refreshToken });
            store.dispatch({
                type: actionTypes.Login,
                payload: {
                    token: res.access_token,
                    refreshToken: res.refresh_token
                }
            });

            // Calling again
            if (res.access_token) {
                response = await fetch(url, {
                    ...data,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${res.access_token}`
                    }
                });

                return response;
            }
        } catch (e) {
            // store.dispatch({
            //     type: actionTypes.SetViewExpired,
            //     payload: { isExpired: true }
            // });

            // changeRoute("/viewexpired");

            store.dispatch(
                openSnackbar({
                    open: true,
                    message: 'Session Expired',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    }
                })
            );

            store.dispatch({
                type: actionTypes.Logout
            });
            store.dispatch({
                type: CLEAR_MENU
            });

            let errorStatus = { status: 'SESSION_EXPIRED' };
            throw new Error(JSON.stringify(errorStatus));
            // return;
        }
    }

    if (handleServerErrors && response.status >= 500) {
        // changeRoute("/error");

        let errorStatus = { status: 'ERROR' };
        throw new Error(JSON.stringify(errorStatus));
        // return;
    }

    if (response.status === 429 || response.status === 413) {
        store.dispatch({
            type: actionTypes.SetViewExpired,
            payload: { isExpired: true }
        });

        // changeRoute("/too-many-requests");

        let errorStatus = { status: 'CYBER_ATTACK' };
        throw new Error(JSON.stringify(errorStatus));
        // return;
    }

    if (response.status === 400) {
        let errorMessage = { status: 'BAD_REQUEST' };
        let resp = null;
        try {
            resp = await response.json();
        } catch (e) {
            resp = e;
        }

        errorMessage = { ...errorMessage, data: resp };
        throw new Error(JSON.stringify(errorMessage));
    }

    // Need to send response, NOT response.json
    return response;
};

const fetchWithFormData = async (url, data = {}, login = false, handleServerErrors = true) => {
    const {
        auth: { token, refreshToken }
    } = store.getState();

    let response = await fetch(url, {
        ...data
    });
    // Handle only 401 here...
    // UN_AUTHORIZED
    if (response.status === 401 && !login) {
        try {
            let res = await refreshTokenRequest({ refreshToken: refreshToken });
            store.dispatch({
                type: actionTypes.Login,
                payload: {
                    token: res.access_token,
                    refreshToken: res.refresh_token
                }
            });

            // Calling again
            if (res.token) {
                response = await fetch(url, {
                    ...data,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${res.token}`
                    }
                });

                return response;
            }
        } catch (e) {
            store.dispatch({
                type: actionTypes.SetViewExpired,
                payload: { isExpired: true }
            });
            // throw e;
            let errorStatus = { status: 'SESSION_EXPIRED' };
            throw new Error(JSON.stringify(errorStatus));
        }
    }

    if (response.status === 401 && login) {
        let errorStatus = { status: 'INVALID_CREDENTIALS' };
        throw new Error(JSON.stringify(errorStatus));
    }

    if (handleServerErrors && response.status >= 500) {
        // changeRoute("/error");
        // return;
        let errorStatus = { status: 'ERROR' };
        throw new Error(JSON.stringify(errorStatus));
    }

    if (response.status === 429 || response.status === 413) {
        store.dispatch({
            type: actionTypes.SetViewExpired,
            payload: { isExpired: true }
        });

        // changeRoute("/too-many-requests");
        // return;
        let errorStatus = { status: 'CYBER_ATTACK' };
        throw new Error(JSON.stringify(errorStatus));
    }

    if (response.status === 400) {
        let errorMessage = { status: 'BAD_REQUEST' };
        let resp = null;
        try {
            resp = await response.json();
        } catch (e) {
            resp = e;
        }

        errorMessage = { ...errorMessage, data: resp };
        throw new Error(JSON.stringify(errorMessage));
    }

    // Need to send response, NOT response.json
    return response;
};

const simpleFetch = async (url, data = {}, handleServerErrors = true) => {
    let response = await fetch(url, {
        ...data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (handleServerErrors && response.status >= 500) {
        // changeRoute("/error");
        // return;
        let errorStatus = { status: 'ERROR' };
        throw new Error(JSON.stringify(errorStatus));
    }

    if (response.status === 429 || response.status === 413) {
        store.dispatch({
            type: actionTypes.SetViewExpired,
            payload: { isExpired: true }
        });

        changeRoute('/too-many-requests');
        // return;
        let errorStatus = { status: 'CYBER_ATTACK' };
        throw new Error(JSON.stringify(errorStatus));
    }

    if (response.status === 400) {
        let errorMessage = { status: 'BAD_REQUEST' };
        let resp = null;
        try {
            resp = await response.json();
        } catch (e) {
            resp = e;
        }

        errorMessage = { ...errorMessage, data: resp };
        throw new Error(JSON.stringify(errorMessage));
    }

    // Need to send response, NOT response.json
    return response;
};

export { fetchWithFormData, simpleFetch };
export default authenticatedFetch;

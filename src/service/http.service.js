import axios from 'axios';
import NotifyService from './notify.service';
import APP, { BASE_URL } from '../constant/app.constant';

export const defautlHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
};

export async function Get(obj) {
    if (!(obj && obj.url)) {
        return false;
    }

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Post(obj) {
    obj.method = 'POST';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Put(obj) {
    obj.method = 'PUT';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Delete(obj) {
    obj.method = 'DELETE';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

function getToken() {
    return APP.TOKEN;
}

function ApiCall({ url, method, headers, body, resolve = defaultResolve, reject = defaultReject, params, callback, hideMessage }) {
    const postDict = {
        headers, method
    };

    if (body) { // if body is attached
        postDict.body = body;
    }

    return axios({
        url,
        headers,
        data: body,
        method,
        params,
    })
        .then((response) => {
            return resolve(response.data, { callback, hideMessage });
        })
        .catch((error) => {
            return reject(error);
        });
}

async function getNecessaryParams(obj) {
    const url = createFinalUrl(obj);
    const method = obj.method || 'GET';
    const headers = await createHeader(obj);

    const resolve = obj.hasOwnProperty('resolve') ? obj.resolve : resolve;
    const reject = obj.hasOwnProperty('reject') ? obj.reject : reject;

    const responseObj = {
        url, method, headers, resolve, reject, hideMessage: obj.hideMessage || false
    };

    if (obj.body) {
        responseObj.body = obj.body;
    }

    return responseObj;
}

function createFinalUrl(obj) {
    const baseUrl = BASE_URL;
    return `${baseUrl}/${obj.url}`;
}

async function createHeader(obj) {
    const headers = defautlHeaders;
    const token = getToken();
    headers['Authorization'] = `Bearer ${token}`;

    // if headers are not passed
    if (!obj.headers) {
        return headers;
    }

    // extend default header options with one, passed with obj
    return { ...headers, ...obj.headers };
}

function defaultResolve(result, { callback, hideMessage }) {
    if (typeof callback == 'function') {
        callback(result);
    }

    if (result && result.response && typeof result.response == 'string' && !hideMessage) {
        NotifyService.notify({
            title: '',
            message: result.response,
            type: result.success ? 'success' : 'error',
            duration: 1200
        })
    }

    return result;
}

function defaultReject(response) {
    NotifyService.notify({
        title: 'Server issue',
        message: '',
        type: 'error',
        duration: 1200
    })
    return response;
}
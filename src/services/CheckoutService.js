import { SERVICE_URL } from '../constants';
import simpleFetch from './fetch';

export async function getAllProductList(requestBody) {
    const response = await simpleFetch(`${SERVICE_URL}/user/${requestBody.userId}/order/${requestBody.orderId}`, {
        method: 'POST'
        // body: JSON.stringify(requestBody)
    });
    let errorMessage = { status: 'ERROR' };
    if (response.status !== 200) {
        throw new Error(JSON.stringify({ ...errorMessage }));
    }

    try {
        return await response.json();
    } catch (e) {
        throw new Error(JSON.stringify({ ...errorMessage, data: e }));
    }
}

export async function updateOrderDetail(requestBody, userId, orderId) {
    const response = await simpleFetch(`${SERVICE_URL}/user/${userId}/order/${orderId}`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
    let errorMessage = { status: 'ERROR' };
    if (response.status !== 200) {
        throw new Error(JSON.stringify({ ...errorMessage }));
    }

    try {
        return await response.json();
    } catch (e) {
        throw new Error(JSON.stringify({ ...errorMessage, data: e }));
    }
}

export async function deleteProduct(userId, cartId) {
    const response = await simpleFetch(`${SERVICE_URL}/user/${userId}/cart/${cartId}`, {
        method: 'DELETE'
        // body: JSON.stringify(requestBody)
    });
    let errorMessage = { status: 'ERROR' };
    if (response.status !== 200) {
        throw new Error(JSON.stringify({ ...errorMessage }));
    }

    try {
        return await response.json();
    } catch (e) {
        throw new Error(JSON.stringify({ ...errorMessage, data: e }));
    }
}

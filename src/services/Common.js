import { SERVICE_URL } from 'constants';
import authenticatedFetch from './fetch';

export async function activityLogsReport(requestBody) {
    const response = await authenticatedFetch(`${SERVICE_URL}/common/activity-logs/report`, {
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

export async function heartBeatsReport(requestBody = {}) {
    const response = await authenticatedFetch(`${SERVICE_URL}/common/heart-beats-report`, {
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

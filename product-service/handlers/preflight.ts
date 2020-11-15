import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {getCorsHeaders} from './common';

export const preflight: APIGatewayProxyHandler = async (event) => {
    console.log('[preflight-event-details]: ', JSON.stringify(event));
    try {
        return {
            statusCode: 204,
            headers: getCorsHeaders(),
            body: '',
        };
    } catch (e) {
        console.error('[preflight-error]', e);
        return {
            statusCode: 500,
            headers: getCorsHeaders(),
            body: '',
        };
    }
};

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { fetchProduct } from '../api/productApi';
import {getCorsHeaders} from './common';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    console.log('[create-prod-by-id-event-details]: ', JSON.stringify(event));
    try {
        const requestedProduct = await fetchProduct(event.pathParameters.id);
        if (requestedProduct) {
            return {
                statusCode: 200,
                headers: getCorsHeaders(),
                body: JSON.stringify(requestedProduct),
            };
        }
        return {
            statusCode: 404,
            headers: getCorsHeaders(),
            body: JSON.stringify({message: 'Product not found'})
        }
    } catch (e) {
        console.error('[get-prod-by-id-error]', e);
        return {
            statusCode: 500,
            headers: getCorsHeaders(),
            body: JSON.stringify({message: 'Unexpected Error'})
        }
    }
};

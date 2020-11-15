import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { importProduct } from '../api/productApi';
import {getCorsHeaders} from './common';

const dataIsValid = (data) => {
    return data.title && data.description && data.price && data.count && typeof data.title === 'string'
        && typeof data.description === 'string' && typeof data.price === 'number' && typeof data.count === 'number';
};

export const createProduct: APIGatewayProxyHandler = async (event) => {
    console.log('[create-prod-event-details]: ', JSON.stringify(event));
    try {
        const productDetails = JSON.parse(event.body);
        if (!dataIsValid(productDetails)) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(),
                body: JSON.stringify({message: 'Invalid data structure'})
            }
        }
        await importProduct(productDetails);
        return {
            statusCode: 200,
            headers: getCorsHeaders(),
            body: JSON.stringify({message: 'Product has been added to the store.'}),
        };
    } catch (e) {
        console.error('[create-product-error]', e);
        return {
            statusCode: 500,
            headers: getCorsHeaders(),
            body: JSON.stringify({message: 'Unexpected Error'})
        }
    }
};

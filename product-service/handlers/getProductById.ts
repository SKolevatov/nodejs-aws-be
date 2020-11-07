import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { fetchProducts } from '../api/productApi';
import {getCorsHeaders} from "./common";

export const getProductById: APIGatewayProxyHandler = async (event) => {
    try {
        const productList = await fetchProducts();
        const requestedProduct = productList.find(product => product.id === event.pathParameters.id);
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

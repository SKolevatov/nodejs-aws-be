import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {fetchProducts} from '../api/productApi';
import {getCorsHeaders} from "./common";

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const productList = await fetchProducts();
        return {
            statusCode: 200,
            headers: getCorsHeaders(),
            body: JSON.stringify(productList),
        };
    } catch (e) {
        console.error('[get-prod-list-error]', e);
        return {
            statusCode: 500,
            headers: getCorsHeaders(),
            body: JSON.stringify({message: 'Unexpected Error'})
        };
    }
};

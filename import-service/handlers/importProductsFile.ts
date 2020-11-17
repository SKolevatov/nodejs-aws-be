import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import 'source-map-support/register';

const BUCKET = 'rss-task5';

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
    const s3 = new S3({region: 'eu-west-1'});
    console.log('event:', event);
    const name = event.queryStringParameters.name;
    const path = `uploaded/${name}`;
    const params = {
        Bucket: BUCKET,
        Key: path,
        Expires: 60,
        ContentType: 'text/csv'
    };

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        const response = {
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: signedUrl.toString()
        };
        return response
    } catch(e) {
        console.error(e);
        return {
            statusCode: 500,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({Error})
        };
    }
};

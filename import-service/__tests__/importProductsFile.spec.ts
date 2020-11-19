const {mock} = require('aws-sdk-mock');
const {importProductsFile} = require('../handlers/importProductsFile');

describe('importProductFile', () => {
    it('returns URL', async () => {
        const getSignedUrlMock = jest.fn((operation, params, callback) => {
            console.log(operation, params);
            callback(null, 'signed-url');
        });
        mock('S3', 'getSignedUrl', getSignedUrlMock);

        const result = await importProductsFile({
                body: undefined,
                headers: {},
                httpMethod: "GET",
                isBase64Encoded: false,
                multiValueHeaders: {},
                multiValueQueryStringParameters: undefined,
                path: "",
                pathParameters: undefined,
                requestContext: undefined,
                resource: "",
                stageVariables: undefined,
                queryStringParameters: {name: 'test'}
            },
            null, () => null);

        expect(result.body).toEqual('signed-url');
    })
});
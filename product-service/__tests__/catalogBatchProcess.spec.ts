import { SQSEvent } from 'aws-lambda';
const { mock } = require('aws-sdk-mock');
jest.mock('../api/productApi');
const { importProduct } = require('../api/productApi');
import { catalogBatchProcess } from '../handlers/catalogBatchProcess'

describe('catalogBatchProcess', () => {
    mock('SNS', 'publish', 'Mock');
    it("doesn't add product if data is invalid", async () => {
        await catalogBatchProcess(<SQSEvent>{
                Records: [{
                    body: JSON.stringify({
                        foo: 'bar',
                    })
                }]
            },
            null, () => null);
        expect(importProduct).toBeCalledTimes(0);
    });

    it('handles the sqs event with correct data', async () => {
        await catalogBatchProcess(<SQSEvent>{
                Records: [{
                    body: JSON.stringify({
                        title: 'Name',
                        description: 'Description',
                        count: 5,
                        price: 10,
                    })
                }]
            },
            null, () => null);
        expect(importProduct).toBeCalledTimes(1);
    });
});
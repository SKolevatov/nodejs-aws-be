import { SQSHandler } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import 'source-map-support/register';
import { importProduct } from '../api/productApi';

const normalizeProductDetails = (details) => {
    if (!details.title || !details.description || !details.count || !details.price) {
        throw Error(`Invalid product format, ${JSON.stringify(details)}`);
    }
    return {
        title: details.title,
        description: details.description,
        price: +details.price,
        count: +details.count,
    }
};

export const addProductFromRecord = async (record) => {
    const productDetails = JSON.parse(record.body);
    const normalizedProductDetails = normalizeProductDetails(productDetails);
    await importProduct(normalizedProductDetails);
    return normalizedProductDetails;
};

export const catalogBatchProcess: SQSHandler = async (event) => {
    console.log('event:', event);
    const sns = new SNS({region: 'eu-west-1'});
    const records = event.Records;
    const products = [];
    try {
        for (const record of records) {
            const product = addProductFromRecord(record);
            products.push(product);
        }
        await sns.publish({
            Subject: 'New products added to the store',
            Message: JSON.stringify(products),
            MessageAttributes: {
                result: {
                    DataType: "String",
                    StringValue: "ok"
                },
            },
            TopicArn: process.env.SNS_ARN
        }).promise();
        console.log('email sent');
    } catch (err) {
        await sns.publish({
            Subject: 'ERROR OCCURRED',
            Message: `Something went wrong while adding new products: ${JSON.stringify(err)}`,
            MessageAttributes: {
                result: {
                    DataType: "String",
                    StringValue: "error"
                },
            },
            TopicArn: process.env.SNS_ARN
        }).promise();
        console.error('Error: ', err);
    }
};

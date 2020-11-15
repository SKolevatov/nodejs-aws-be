import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';
import 'source-map-support/register';
import 'stream';
import * as stream from "stream";

const BUCKET = 'rss-task5';


export const importFileParser: S3Handler = async (event) => {
    const s3 = new S3({region: 'eu-west-1'});
    console.log('event:', event);
    const records = event.Records;
    records.map(async (record) => {
        console.log(record);
        const key = record.s3.object.key;
        console.log(key);

        const s3object = (await s3.getObject({
            Bucket: BUCKET,
            Key: key
        }).promise());
        const csvReadStream = new stream.Readable();
        csvReadStream._read = () => {};
        csvReadStream.push(s3object.Body);

        csvReadStream
            .on('error', err => {
                console.log(err);
            })
            .pipe(csvParser())
            .on('data', data => console.log(`DATA from ${key}:`, data))
            .on('end', () => {
                console.log(`${key} is read`);
            })
            .on('error', err => {
            console.error(err);
        });

        console.log(`Copying ${key}...`);
        await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${key}`,
            Key: key.replace('uploaded', 'parsed')
        }).promise().catch((err) => {
            console.warn(`failed to copy ${key}`, err);
        });
        console.log(`Copied. Deleting ${key}...`);
        await s3.deleteObject({
                Bucket: BUCKET,
                Key: key
            }).promise().catch((err) => {
                    console.warn(`failed to delete file ${key}`, err)
            });
        console.log(`Deleted ${key}`);
    })
};

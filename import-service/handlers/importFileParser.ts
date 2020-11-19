import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';
import 'source-map-support/register';

const BUCKET = 'rss-task5';


export const importFileParser: S3Handler = (event) => {
    const s3 = new S3({region: 'eu-west-1'});
    console.log('event:', event);
    const records = event.Records;
    records.map((record) => {
        console.log(record);
        const key = record.s3.object.key;
        console.log(key);
        s3.getObject({
            Bucket: BUCKET,
            Key: key
        }).createReadStream()
            .on('error', err => console.error(err))
            .pipe(csvParser())
            .on('data', data => console.log(`DATA from ${key}:`, data))
            .on('end', () => {
                console.log(`${key} is read`);
                s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${key}`,
                    Key: key.replace('uploaded', 'parsed')
                }, (err) => {
                    if (err) {
                        console.warn(`failed to copy ${key}`, err);
                    }
                    console.log(`copied ${key}, deleting...`);
                    s3.deleteObject({
                        Bucket: BUCKET,
                        Key: key
                    }, (err) => {
                        if (err) {
                            console.warn(`failed to delete file ${key}`, err)
                        }
                    });
                });
            })
            .on('error', err => console.error(err));

    })
};

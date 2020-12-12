const express = require('express');
require('dotenv').config();
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3001;

const cacheObj = {};

app.use(express.json());

app.all('/*', (req, res) => {
    const { originalUrl, method, body } = req;

    const recipient = originalUrl.split('/')[1];

    const recipientUrl = process.env[recipient];
    const requestUrl = `${recipientUrl}${originalUrl}`;
    if (recipientUrl) {
        const config = {
            method,
            url: requestUrl,
            ...(Object.keys(req.body || {}).length > 0 && {data: body})
        };

        if (method === 'GET') {
            if (cacheObj[requestUrl] && cacheObj[requestUrl].expires > Date.now()) {
                console.log(`cache hit: ${requestUrl}`);
                res.json(cacheObj[requestUrl]);
                return;
            }
            console.log(`cache miss: ${requestUrl}`);
        }


        axios(config).then(resp => {
            if (method === 'GET') {
                cacheObj[requestUrl] = {
                    value: resp.data,
                    expires: Date.now() + 120000
                };

            }
            res.json(resp.data)
        }).catch(err => {
            // console.error(err);

            if (err.response) {
                const {status, data} = err.response;

                res.status(status).json(data);
            } else {
                res.status(500).json({error: err.message});
            }
        });
    } else {
        res.status(502).json({error: 'Cannot process the request'});
    }
});

app.listen(PORT);

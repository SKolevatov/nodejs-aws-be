const { Client } = require('pg');

const {PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;
const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};

export const importProduct = async (productDetails) => {
    return runQueryOnDD(`
        begin;
        with product as (
        insert into products (title, description, price) values
        ('${productDetails.title}', '${productDetails.description}', ${productDetails.price})
        insert into stocks (product_id, count) values
        ((select id from product) , ${productDetails.count});
        commit;
    `)
};

export const fetchProducts = async () => {
    return runQueryOnDD(`
        select id, title, description, price, count from products JOIN stocks s2 on products.id = s2.product_id;
    `);
};

export const fetchProduct = async (id) => {
    return runQueryOnDD(`
        select id, title, description, price, count from products p JOIN stocks s on p.id = s.product_id
        where p.id = '${id}';
    `);
};

export const runQueryOnDD = async (query: string) => {
    const client = new Client(dbOptions);
    await client.connect();
    console.log(query);
    try {
        const result = await client.query(query);
        console.log(result);
        return result.rows;
    } catch(err) {
        console.error('Error during database request executing:', err);
    } finally {
        client.end();
    }
};
const { Client, Pool } = require('pg');

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
    const pool = new Pool(dbOptions);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const insertProductsText = 'insert into products (title, description, price) values ($1, $2, $3) returning id';
        const res = await client.query(insertProductsText, [
            productDetails.title,
            productDetails.description,
            productDetails.price
        ]);
        console.log(res);
        const insertStocksText = 'insert into stocks (product_id, count) values ($1, $2)';
        await client.query(insertStocksText, [res.rows[0].id, productDetails.count]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during database request executing:', error);
        throw error;
    } finally {
        client.release();
    }
};

export const fetchProducts = async () => {
    return runQueryOnDD(`
        select id, title, description, price, count from products JOIN stocks s2 on products.id = s2.product_id;
    `, null);
};

export const fetchProduct = async (id) => {
    return runQueryOnDD(`
        select id, title, description, price, count from products p JOIN stocks s on p.id = s.product_id
        where p.id = $1;
    `, [id]);
};

export const runQueryOnDD = async (query: string, params) => {
    const client = new Client(dbOptions);
    await client.connect();
    console.log(query);
    try {
        const result = await client.query(query, params);
        console.log(result);
        return result.rows;
    } catch(err) {
        console.error('Error during database request executing:', err);
    } finally {
        client.end();
    }
};
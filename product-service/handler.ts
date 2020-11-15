import 'source-map-support/register';

const { getProductsList } = require('./handlers/getProductsList');
const { getProductById } = require('./handlers/getProductById');
const { createProduct } = require('./handlers/createProduct');
const { preflight } = require('./handlers/preflight');

export { getProductsList, getProductById, createProduct, preflight };
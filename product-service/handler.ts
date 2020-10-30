import 'source-map-support/register';

const { getProductsList } = require('./handlers/getProductsList');
const { getProductById } = require('./handlers/getProductById');

export { getProductsList, getProductById };
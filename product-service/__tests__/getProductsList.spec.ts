const { getProductsList } = require('../handlers/getProductsList');

describe('getProductList', () => {
    it('happy path', async () => {
        const result = await getProductsList(null, null, () => null);
        expect(result.statusCode).toEqual(200);
        const products = JSON.parse(result.body);
        expect(products.length).toEqual(12);
    });
});

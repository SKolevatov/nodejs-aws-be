const { getProductById } = require('../handlers/getProductById');

xdescribe('getProductList', () => {
    it('Happy path', async () => {
        const result = await getProductById({pathParameters: {id: '1'}}, null, () => null);
        expect(result.statusCode).toEqual(200);
        const product = JSON.parse(result.body);
        expect(product).toEqual({"id":"1","name":"Bristlecone","manufacture":"Google","qubits":72});
    });

    it('No product with such id', async () => {
        const result = await getProductById({pathParameters: {id: '18'}}, null, () => null);
        expect(result.statusCode).toEqual(404);
        const body = JSON.parse(result.body);
        expect(body.message).toEqual("Product not found");
    });
});

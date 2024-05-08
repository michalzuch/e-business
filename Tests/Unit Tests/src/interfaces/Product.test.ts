import { Product } from './Product';

test('Product', () => {
    const product: Product = {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Product description',
        stock: 10
    }
    
    expect(product.id).toEqual(1)
    expect(product.name).toEqual('Product 1')
    expect(product.price).toEqual(100)
})
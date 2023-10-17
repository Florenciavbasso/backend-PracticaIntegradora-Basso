import Product from '../models/Product';

class ProductRepository {
  static async getProductById(productId) {
    return Product.getProductById(productId);
  }
}

export default ProductRepository;
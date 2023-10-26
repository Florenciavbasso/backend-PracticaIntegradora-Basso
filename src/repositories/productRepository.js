import Product from '../models/Product.js';

class ProductRepository {
    async getProductById(productId) {
        try {
            return await Product.findById(productId);
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            return await Product.find().exec();
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            return await Product.findByIdAndUpdate(productId, productData, {
                new: true
            }).exec();
        } catch (error) {
            throw error;
        }
    }

    async decreaseStock(productId, quantity) {
        try {
            // Implementa la lógica para reducir la cantidad de stock de un producto específico aquí
        } catch (error) {
            throw error;
        }
    }
}

export default ProductRepository;
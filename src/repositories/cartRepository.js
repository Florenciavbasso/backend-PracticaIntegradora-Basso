import Cart from '../models/Cart.js';

class CartRepository {
    async createCart(cartData) {
        try {
            return await Cart.create(cartData);
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            return await Cart.findById(cartId).exec();
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, cartData) {
        try {
            return await Cart.findByIdAndUpdate(cartId, cartData, {
                new: true
            }).exec();
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cartId) {
        try {
            return await Cart.findByIdAndRemove(cartId).exec();
        } catch (error) {
            throw error;
        }
    }

    async getCartsByUserId(userId) {
        try {
            return await Cart.find({
                user: userId
            }).exec();
        } catch (error) {
            throw error;
        }
    }

    async finalizePurchase(cartId) {
    }
}

export default CartRepository;
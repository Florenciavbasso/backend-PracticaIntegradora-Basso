import { Router } from "express";
import ProductRepository from '../repositories/productRepository';
import TicketService from '../services/ticketService';
import {
  createNewCartController, 
  getCartByIdController, 
  setProductToCart, 
  deleteProductInCart,
  replaceProductsInCart,
  updateProductQuantityInCart,
  deleteAllProductsInCart
} from '../controllers/cartController.js';

const router = Router();

// Importa el modelo de Ticket
import Ticket from '../models/Ticket';

// Ruta para finalizar el proceso de compra
router.post('/:cid/purchase', async (req, res) => {
    try {
      // Obtén información del producto y usuario
      const product = await ProductRepository.getProductById(req.params.productId);
  
      // Verifica si hay suficiente stock
      if (product.stock >= req.body.quantity) {
        // Resta el stock y continúa con el proceso de compra
        product.stock -= req.body.quantity;
        await product.save();
  
        // Genera un ticket con el servicio de Tickets
        const ticket = await TicketService.generateTicket(req.user.email, req.body.quantity, product.price);
  
        // Actualiza el carrito del usuario
        req.user.cart.products = req.user.cart.products.filter(p => p.id !== req.params.productId);
  
        res.json({ success: true, ticket });
      } else {
        res.status(400).json({ success: false, message: 'No hay suficiente stock para este producto.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al procesar la compra.' });
    }
  });


router.post('/', createNewCartController )

router.get('/:cid', getCartByIdController)

router.post('/:cid/products/:pid', setProductToCart)

router.delete('/:cid/products/:pid', deleteProductInCart)

router.put('/:cid', replaceProductsInCart)

router.put('/:cid/products/:pid', updateProductQuantityInCart)

router.delete('/:cid', deleteAllProductsInCart)

export default router
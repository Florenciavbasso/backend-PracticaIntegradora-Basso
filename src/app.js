import express from 'express';
import http from 'http';
import path from 'path';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from './config/passport-config.js';
import initializePassport from './config/passport-config.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { ProductManager } from './ProductManager.js';
import { Server } from 'socket.io';

import ProductRepository from './repositories/productRepository.js';
import TicketService from './services/ticketService.js';

// Importa el logger
const logger = require('./logger');

// Rutas
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mockingProductsRoute from './routes/mockingProductsRoute.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8080;

app.use('/mockingProducts', mockingProductsRoute);

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/charra', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.development.info('Connected to MongoDB');
  const MongoStore = connectMongo.create({
    client: mongoose.connection.getClient(),
  });

  app.use(session({
    secret: 'clave-secreta-flo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
  }));

  // Configura Passport
  initializePassport(passport);

  const currentFileUrl =
    import.meta.url;
  const __dirname = path.dirname(new URL(currentFileUrl).pathname);
  const productManager = new ProductManager(path.join(__dirname, 'data/products.json'));
  const hbs = exphbs.create();
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));

  // Rutas
  app.use('/cart', cartRoutes);
  app.use('/products', productRoutes);
  app.use('/users', userRoutes); // Usar las rutas de usuarios

  // Servir archivos estáticos desde la carpeta "public"
  app.use(express.static(path.join(__dirname, 'public')));

  // Ruta para la vista en tiempo real utilizando Handlebars y WebSockets
  app.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', {
      products,
    });
  });

  // Manejar conexiones de socket.io
  io.on('connection', (socket) => {
    logger.development.info('Usuario conectado por WebSocket');

    socket.on('productoCreado', (newProduct) => {
      // Manejar evento de nuevo producto
      logger.development.debug('Nuevo producto:', newProduct);
    });

    socket.on('productoActualizado', (productId) => {
      // Manejar evento de producto actualizado
      logger.development.debug('Producto actualizado:', productId);
    });

    socket.on('productoEliminado', (productId) => {
      // Manejar evento de producto eliminado
      logger.development.debug('Producto eliminado:', productId);
    });

    socket.on('disconnect', () => {
      logger.development.info('Usuario desconectado por WebSocket');
    });
  });

  // Se suma la ruta /api/sessions/current para obtener el usuario actual
  app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        user: req.user,
      });
    } else {
      res.json({
        user: null,
      });
    }

    // Ejemplo de registro de eventos
    logger.development.debug('Solicitud de información de sesión actual');
  });

  // Usar el middleware de manejo de errores
  app.use(errorHandler);
  app.use(notFoundHandler);

  // Iniciar el servidor
  server.listen(port, () => {
    logger.development.info(`Servidor Express corriendo en http://localhost:${port}`);
  });
}).catch(error => {
  logger.development.error('Error connecting to MongoDB:', error);
  process.exit(1);
});
